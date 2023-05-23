'use client'

import { ComponentProps, type FC, type PropsWithChildren } from 'react'
import { BsGithub, BsGoogle } from 'react-icons/bs'

import { signIn, signOut } from 'next-auth/react'

type ButtonProps = PropsWithChildren & ComponentProps<'button'>

export const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className='
      mb-2 inline-flex items-center
      justify-center gap-2 rounded-lg bg-purple-500 px-5 py-2.5 
      text-sm font-medium text-white hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700
      '
      {...rest}
    >
      {children}
    </button>
  )
}

export const SignOut = () => {
  return <Button onClick={() => signOut()}>Sign Out</Button>
}
export const GoogleSignInButton = () => {
  return (
    <Button onClick={() => signIn('google', { callbackUrl: '/username' })}>
      Continue with Google <BsGoogle />
    </Button>
  )
}

export const GithubSignInButton = () => {
  return (
    <Button onClick={() => signIn('github', { callbackUrl: '/username' })}>
      Continue with GitHub <BsGithub />
    </Button>
  )
}

export const SignInButton = () => {
  return <Button onClick={() => signIn()}>Sign In</Button>
}
