import { PropsWithChildren } from 'react'

import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Button } from '@/components/buttons'
import { ImagePreview } from '@/components/image.preview'
import prisma from '@/lib/prisma'
import { UserService } from '@/schemas/user-service.schema'

type Props = {
  params: { username: string }
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

type UserFavItemProps = {
  title: string
  subTitle: string | null
  imageSrc: string | null
}

function UserFavItem({ title, subTitle, imageSrc }: UserFavItemProps) {
  return (
    <li className='max-w-sm'>
      <div className='flex items-center gap-4'>
        <ImagePreview className='shrink-0' imageSrc={imageSrc} alt={title} />
        <div>
          <h4 className='line-clamp-1 font-semibold'>{title}</h4>
          <p className='line-clamp-1 text-sm text-slate-400'>{subTitle}</p>
        </div>
      </div>
    </li>
  )
}

type UserFavProps = PropsWithChildren & {
  title: string
  data: UserService[]
}

function UserFav({ title, data }: UserFavProps) {
  return (
    <div>
      <h2 className='mb-2 text-lg font-bold'>{title}</h2>
      <ul className='flex flex-col gap-4 rounded-xl bg-slate-200 p-4'>
        {data.map(item => (
          <UserFavItem
            key={item.id}
            title={item.title}
            subTitle={item.subTitle}
            imageSrc={item.previewImage}
          />
        ))}
      </ul>
    </div>
  )
}

export default async function Username({ params }: Props) {
  let username = decodeURIComponent(params.username)
  if (!username.startsWith('@')) return notFound()

  username = username.slice(1)
  const user = await getUserByUsername(username)
  return (
    <main className='base-page-bg min-h-screen md:pb-24'>
      <div className='mx-auto flex max-w-[95vw] flex-col items-center justify-between gap-8 md:max-w-2xl'>
        <div className='flex items-center justify-center gap-4'>
          {user.image && user.username && (
            <Image
              src={user.image}
              width={100}
              height={100}
              className='rounded-md'
              alt={user.username}
            />
          )}
          <div>
            <h2 className='text-2xl font-bold'>@{user.username}</h2>
            <p className='text-sm text-slate-500'>{user.email}</p>
          </div>
        </div>
        <div className='flex gap-4'>
          <Button>Share Profile</Button>
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
