import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { Button, SignOut } from '@/components/buttons'
import { MovieForm } from '@/components/forms/tmdb'
import { authOptions } from '@/lib/auth'

const Profile = async () => {
  const session = await getServerSession(authOptions)

  if (!session || !session?.user) {
    return redirect('/auth')
  }

  return (
    <main className='min-h-screen p-24'>
      <div className='mx-auto flex max-w-xl flex-col items-center justify-between gap-8'>
        <div className='flex items-center justify-center gap-4'>
          {session.user?.image && session.user?.username && (
            <Image
              src={session.user?.image}
              width={100}
              height={100}
              className='rounded-md'
              alt={session.user?.username}
            />
          )}
          <div>
            <h2 className='text-2xl font-bold'>@{session.user?.username}</h2>
            <p className='text-sm text-slate-400'>{session.user?.email}</p>
          </div>
        </div>
        <div className='flex gap-4'>
          <SignOut />
          {/* <Button>Add Fav</Button> */}
        </div>
        <div>
          <MovieForm />
        </div>
      </div>
    </main>
  )
}

export default Profile
