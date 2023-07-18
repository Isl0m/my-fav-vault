import { Metadata, ResolvingMetadata } from 'next'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import { notFound } from 'next/navigation'

import { Suspense } from 'react'

import { Prisma } from '@prisma/client'

import { ImagePreview } from '@/components/image-preview'
import {
  SimilarProfiles,
  SimilarProfilesLoading,
} from '@/components/similar-profiles'
import { ShareProfileButton } from '@/components/ui/button'
import { UserFav } from '@/components/user-fav'

import { UserService } from '@/schemas/user-service.schema'
import prisma from '@/lib/prisma'

export const getFullUser = async (username: string) =>
  await prisma.user.findUnique({
    where: { username },
    include: {
      books: true,
      musics: true,
      movies: true,
    },
  })


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
      <div className='mx-auto flex max-w-[95vw] flex-col items-center justify-between gap-8 md:max-w-2xl'>
        <div className='flex items-center justify-center gap-4'>
          <ImagePreview
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
        </div>
        <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2'>
          {!!user.movies.length && (
            <UserFav title='User fav movies' data={user.movies} />
          )}
          {!!user.musics.length && (
            <UserFav title='User fav movies' data={user.musics} />
          )}
          {!!user.books.length && (
            <UserFav title='User fav movies' data={user.books} />
          )}
        </div>
        <div>
          <h3 className='text-2xl font-semibold tracking-tight'>
            Similar Profiles
          </h3>
          <Suspense fallback={<SimilarProfilesLoading />}>
            {/* @ts-expect-error Async Server Component */}
            <SimilarProfiles
              id={user.id}
              books={user.books}
              musics={user.musics}
              movies={user.movies}
            />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
