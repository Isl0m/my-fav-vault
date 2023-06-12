import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/buttons'
import { BookForm } from '@/components/forms/book'
import { MovieForm } from '@/components/forms/movie'
import { MusicForm } from '@/components/forms/music'
import { ProfileImage } from '@/components/profile.image'
import { getSessionOrRedirect } from '@/lib/utils-server'

export default async function Profile() {
  const session = await getSessionOrRedirect('/auth')

  return (
    <main className='base-page-bg mt-8 min-h-without-header md:pb-24'>
      <div className='mx-auto flex max-w-3xl flex-col items-center justify-between gap-8'>
        <div className='flex items-center justify-center gap-4'>
          <ProfileImage
            imageSrc={session.user.image}
            alt={session.user.username || 'profile image'}
            username={session.user.username}
          />
          <div>
            <h2 className='text-2xl font-bold'>@{session.user.username}</h2>
            <p className='text-sm text-slate-500'>{session.user.email}</p>
          </div>
        </div>
        <div className='flex gap-4'>
          <Link href={`/@${session.user.username}`}>
            <Button variant={'secondary'}>Preview profile</Button>{' '}
          </Link>
        </div>
        <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2'>
          {/* @ts-expect-error Async Server Component */}
          <MovieForm />
          {/* @ts-expect-error Async Server Component */}
          <MusicForm />
          {/* @ts-expect-error Async Server Component */}
          <BookForm />
        </div>
      </div>
    </main>
  )
}
