import Image from 'next/image'

import { GithubSignInButton, GoogleSignInButton } from '@/components/buttons'
import { AuthForm } from '@/components/forms/auth'
import prisma from '@/lib/prisma'
import {
  checkSessionAndRedirect,
  getUsernameOrRedirect,
} from '@/lib/utils-server'

export default async function Auth() {
  await getUsernameOrRedirect()
  await checkSessionAndRedirect()
  const usernames = await prisma.user.findMany({
    where: {
      NOT: {
        username: null,
      },
    },
    select: {
      username: true,
    },
  })
  return (
    <main className='container mx-auto h-without-header py-12'>
      <div className='flex h-full items-center justify-center gap-8'>
        <div className='flex flex-col items-center justify-between gap-4 md:basis-1/2 xl:basis-1/3'>
          <div className='w-full'>
            <AuthForm usernames={usernames} />
          </div>
          <div className='flex w-full flex-col gap-2'>
            <div className='flex items-center justify-center gap-2 text-slate-500'>
              <hr className='basis-1/3' />
              <h4 className='text-sm'>or</h4>
              <hr className='basis-1/3' />
            </div>
            <GoogleSignInButton />
            <GithubSignInButton />
          </div>
        </div>
        <div className='relative hidden h-full basis-1/2 lg:block'>
          <Image src='/sign_up.svg' alt='sign up' fill={true} />
        </div>
      </div>
    </main>
  )
}
