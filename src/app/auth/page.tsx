import { Metadata } from 'next'

import { AuthForm } from '@/components/forms/auth'
import prisma from '@/lib/prisma'
import {
  checkSessionAndRedirect,
  checkUsernameAndRedirect,
} from '@/lib/utils-server'

export const metadata: Metadata = {
  title: 'Auth | MyFavVault',
}

export default async function Auth() {
  await checkUsernameAndRedirect()
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
    <main className='container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div
          className='absolute inset-0 bg-cover'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)',
          }}
        />
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before. Highly recommended!&rdquo;
            </p>
            <footer className='text-sm'>Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className='lg:p-8'>
        <AuthForm usernames={usernames} />
      </div>
    </main>
  )
}
