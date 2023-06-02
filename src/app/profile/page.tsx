import Image from 'next/image'
import Link from 'next/link'

import { Button, SignOut } from '@/components/buttons'
import { BookForm } from '@/components/forms/book'
import { MovieForm } from '@/components/forms/movie'
import { MusicForm } from '@/components/forms/music'
import { getSessionOrRedirectServer } from '@/lib/utils-server'

const Profile = async () => {
  const session = await getSessionOrRedirectServer('/auth')

  return (
    <main className='base-page-bg mt-8 min-h-screen'>
      <div className='mx-auto flex max-w-3xl flex-col items-center justify-between gap-8'>
        <div className='flex items-center justify-center gap-4'>
          {session.user.image && session.user.username && (
            <Image
              src={session.user.image}
              width={100}
              height={100}
              className='rounded-md'
              alt={session.user.username}
            />
          )}
          <div>
            <h2 className='text-2xl font-bold'>@{session.user.username}</h2>
            <p className='text-sm text-slate-400'>{session.user.email}</p>
          </div>
        </div>
        <div className='flex gap-4'>
          <SignOut />
          <Link href={`/@${session.user.username}`}>
            <Button variant={'secondary'}>Preview profile</Button>{' '}
          </Link>
        </div>
        <div className='flex flex-wrap justify-center gap-8'>
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

export default Profile
