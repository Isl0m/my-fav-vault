import { UserMovie } from '@prisma/client'

import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { ShareProfileButton } from '@/components/buttons'
import { ImagePreview } from '@/components/image.preview'
import { UserFav } from '@/components/user.fav'
import prisma from '@/lib/prisma'
import { SEO } from '@/lib/utils'

type Props = {
  params: { username: string }
}
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = decodeURIComponent(params.username).slice(1)
  const user = await prisma.user.findUnique({
    where: { username },
    select: { image: true },
  })

  const openGraph = user?.image
    ? {
        siteName: SEO.title,
        title: `${username} | MyFavVault`,
        description: SEO.description,
        images: [user.image],
      }
    : null

  return {
    title: `${username} | MyFavVault`,
    openGraph,
  }
}
async function getUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      userBook: true,
      userMusic: true,
      userMovie: true,
    },
  })

  if (!user) return notFound()

  return user
}

export default async function Username({ params }: Props) {
  let username = decodeURIComponent(params.username)
  if (!username.startsWith('@')) return notFound()

  username = username.slice(1)
  const user = await getUserByUsername(username)
  return (
    <main className='base-page-bg mt-8 min-h-screen md:pb-24'>
      <div className='mx-auto flex max-w-[95vw] flex-col items-center justify-between gap-8 md:max-w-2xl'>
        <div className='flex items-center justify-center gap-4'>
          <ImagePreview
            imageSrc={user.image}
            className='aspect-square w-24'
            alt={user.username || 'user image'}
          />
          <div>
            <h2 className='text-2xl font-bold'>@{user.username}</h2>
            <p className='text-sm text-slate-500'>{user.email}</p>
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
