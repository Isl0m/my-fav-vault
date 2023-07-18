import { Book, Movie, Music, User } from '@prisma/client'

import prisma from '@/lib/prisma'

import { Skeleton } from './ui/skeleton'
import { UserCard } from './user-card'

function getServiceIds(service: (Book | Movie | Music)[]) {
  return service.map(s => s.id)
}

type SimilarUsers = {
  [index: string]: {
    username: string
    email: string
    image: string | null
    count: number
  }
}

async function getSimilarUsers(
  id: string,
  bookIds: string[],
  movieIds: string[],
  musicIds: string[]
) {
  let similarUsers: SimilarUsers = {}

  function toSimilarUsers(service: User) {
    if (!service.username || !service.email) return
    const key = service.username

    if (key in similarUsers) {
      similarUsers[key].count += 1
    } else {
      similarUsers[key] = {
        username: service.username,
        email: service.email,
        image: service.image,
        count: 1,
      }
    }
  }

  function getResult() {
    return Object.values(similarUsers)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
  }

  const books = await prisma.book.findMany({
    where: { id: { in: bookIds } },
    select: { user: true },
  })

  const movies = await prisma.movie.findMany({
    where: { id: { in: movieIds } },
    select: { user: true },
  })

  const musics = await prisma.music.findMany({
    where: { id: { in: musicIds } },
    select: { user: true },
  })

  const usersByFavs = [...musics, ...movies, ...books]
  usersByFavs.forEach(s => s.user.filter(u => u.id !== id).map(toSimilarUsers))

  return getResult()
}

type Props = { id: string; books: Book[]; movies: Movie[]; musics: Music[] }

export async function SimilarProfiles({ id, books, movies, musics }: Props) {
  const similarUsers = await getSimilarUsers(
    id,
    getServiceIds(books),
    getServiceIds(movies),
    getServiceIds(musics)
  )

  if (similarUsers.length < 1) {
    return <p className='leading-7'>Not Found</p>
  }

  return (
    <ul className='mt-4 flex w-96 flex-col gap-4'>
      {similarUsers.map(user => (
        <UserCard key={user.username} {...user} />
      ))}
    </ul>
  )
}

export function SimilarProfilesLoading() {
  return (
    <ul className='mt-4 flex flex-col gap-4'>
      <Skeleton className='h-24 w-96 rounded-md' />
      <Skeleton className='h-24 w-96 rounded-md' />
    </ul>
  )
}
