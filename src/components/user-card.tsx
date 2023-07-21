import Link from 'next/link'

import { ImageOrBlank } from './image-preview'

export type UserCardProps = {
  username: string
  email: string
  image: string | null
}

export function UserCard({ username, email, image }: UserCardProps) {
  return (
    <li className='w-full cursor-pointer rounded-md bg-slate-200 p-4 hover:bg-slate-300'>
      <Link
        href={`/@${username}`}
        className='flex items-center gap-4 rounded-md'
      >
        <ImageOrBlank
          imageSrc={image}
          alt={username}
          className='aspect-square'
        />
        <div className='text-left'>
          <h4 className='text-xl font-semibold tracking-tight'>@{username}</h4>
          <p className='leading-7'>{email}</p>
        </div>
      </Link>
    </li>
  )
}
