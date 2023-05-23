import {
  GithubSignInButton,
  GoogleSignInButton,
  SignOut,
} from '@/components/buttons.component'
import { AuthForm } from '@/components/forms/auth'
import prisma from '@/lib/prisma'

const Auth = async () => {
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
    <main className='min-h-screen py-12'>
      <div className='mx-auto flex max-w-xl flex-col items-center justify-between gap-8'>
        <div className='text-center'>
          <h1 className='text-center text-4xl font-semibold text-slate-900'>
            Get started
          </h1>
          <p className='mt-2 text-sm text-slate-500'>Create new accout</p>
        </div>
        <div className='flex flex-col'>
          <GoogleSignInButton />
          <GithubSignInButton />
          <SignOut />
        </div>
        <div>
          <AuthForm usernames={usernames} />
        </div>
      </div>
    </main>
  )
}

export default Auth
