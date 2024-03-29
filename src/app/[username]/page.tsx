import { Metadata, ResolvingMetadata } from 'next'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import { notFound } from 'next/navigation'

import { Prisma } from '@prisma/client'

import { ShareProfileButton } from '@/components/copy-button'
import { ImageOrBlank } from '@/components/image-preview'
import { SimilarProfilesSheet } from '@/components/similar-profiles/profiles-sheet'
import { UserFav } from '@/components/user-fav'
import prisma from '@/lib/prisma'
import { UserService } from '@/schemas/user-service.schema'

async function getFullUser(username: string) {
  return await prisma.user.findUnique({
    where: { username },
    include: {
      books: true,
      musics: true,
      movies: true,
    },
  })
}

async function getUserByUsername(username: string) {
  const user = await getFullUser(username)

  if (!user) return notFound()

  return user
}

type FullUser = Prisma.PromiseReturnType<typeof getFullUser>

function getOpenGraph(user: FullUser): OpenGraph | undefined {
  if (!user || !user.username) return
  const { username, email, image, books, movies, musics } = user

  const toString = (services: UserService[]) =>
    services.map(item => item.title).join(', ')

  const movieText = movies.length ? `\nMovie: ${toString(movies)};` : ''
  const musicText = musics.length ? `\nMusic: ${toString(musics)};` : ''
  const bookText = books.length ? `\nBook: ${toString(books)};` : ''

  return {
    title: username,
    images: image ? [image] : undefined,
    description: `Email: ${email}${movieText}${musicText}${bookText}`,
  }
}

type Props = {
  params: { username: string }
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = decodeURIComponent(params.username).slice(1)
  const user = await getFullUser(username)

  const openGraph = getOpenGraph(user)

  return {
    title: username,
    description: openGraph?.description,
    openGraph,
  }
}

export default async function Username({ params }: Props) {
  let username = decodeURIComponent(params.username)
  if (!username.startsWith('@')) return notFound()

  username = username.slice(1)
  const user = await getUserByUsername(username)
  return (
    <main className='mt-8 min-h-screen md:pb-24'>
      <div className='mx-auto flex max-w-[95vw] flex-col items-center justify-between gap-8 md:max-w-3xl'>
        <div className='flex items-center justify-center gap-4'>
          <ImageOrBlank
            imageSrc={user.image}
            className='aspect-square w-24'
            alt={user.username || 'user image'}
          />
          <div>
            <h3 className='text-2xl font-semibold tracking-tight'>
              @{user.username}
            </h3>
            <p className='leading-7'>{user.email}</p>
          </div>
        </div>
        <div className='flex gap-4'>
          <ShareProfileButton username={username} />
          <SimilarProfilesSheet
            id={user.id}
            books={user.books}
            musics={user.musics}
            movies={user.movies}
          />
        </div>
        <div className='flex flex-wrap justify-center gap-4'>
          {!!user.movies.length && (
            <UserFav title='Movies' data={user.movies} />
          )}
          {!!user.musics.length && (
            <UserFav title='Musics' data={user.musics} />
          )}
          {!!user.books.length && <UserFav title='Books' data={user.books} />}
        </div>
      </div>
    </main>
  )
}
