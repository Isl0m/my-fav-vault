import { Metadata } from 'next'
import Link from 'next/link'

import { BookForm } from '@/components/forms/services/book'
import { MovieForm } from '@/components/forms/services/movie'
import { MusicForm } from '@/components/forms/services/music'
import { ProfileImage } from '@/components/profile-image/profile-image'
import { Button } from '@/components/ui/button'

import { listOfFiles } from '@/lib/supabase'
import { getSessionOrRedirect } from '@/lib/utils-server'

export const metadata: Metadata = {
  title: 'Profile',
}

export default async function Profile() {
  const session = await getSessionOrRedirect('/signin')
  return (
    <main className='mt-8 min-h-without-header md:pb-24'>
      <div className='mx-auto flex max-w-3xl flex-col items-center justify-between gap-8'>
        <div className='flex items-center justify-center gap-4'>
          <ProfileImage
            imageSrc={session.user.image}
            alt={session.user.username}
            username={session.user.username}
          />
          <div>
            <h3 className='text-2xl font-semibold tracking-tight'>
              @{session.user.username}
            </h3>
            <p className='leading-7'>{session.user.email}</p>
          </div>
        </div>
        <div className='flex gap-4'>
          <Link href={`/@${session.user.username}`}>
            <Button>Preview profile</Button>{' '}
          </Link>
        </div>
        {/* <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2'> */}
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
