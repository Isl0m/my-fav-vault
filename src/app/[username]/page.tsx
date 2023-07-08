import { Metadata, ResolvingMetadata } from 'next'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import { notFound } from 'next/navigation'

import { Prisma } from '@prisma/client'

import { ImagePreview } from '@/components/image-preview'
import { ShareProfileButton } from '@/components/ui/button'
import { UserFav } from '@/components/user-fav'

import prisma from '@/lib/prisma'
import { UserService } from '@/schemas/user-service.schema'

async function getFullUser(username: string) {
  return await prisma.user.findUnique({
    where: { username },
    include: {
      userBook: true,
      userMusic: true,
      userMovie: true,
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
  const { username, email, image, userBook, userMovie, userMusic } = user

  const toString = (services: UserService[]) =>
    services.map(item => item.title).join(', ')

  const userMovieText = userMovie.length
    ? `\nUser Movie: ${toString(userMovie)}`
    : ''
  const userMusicText = userMusic.length
    ? `\nUser Music: ${toString(userMusic)}`
    : ''
  const userBookText = userBook.length
    ? `\nUser Book: ${toString(userBook)}`
    : ''

  return {
    title: username,
    images: image ? [image] : undefined,
    description: `Email: ${email}${userMovieText}${userMusicText}${userBookText}`,
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

  return {
    title: username,
    openGraph: getOpenGraph(user),
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
          {!!user.userMovie.length && (
            <UserFav title='User fav movies' data={user.userMovie} />
          )}
          {!!user.userMusic.length && (
            <UserFav title='User fav movies' data={user.userMusic} />
          )}
          {!!user.userBook.length && (
            <UserFav title='User fav movies' data={user.userBook} />
          )}
        </div>
      </div>
    </main>
  )
}
