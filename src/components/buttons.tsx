'use client'

import { VariantProps, cva } from 'class-variance-authority'
import { ComponentProps, type PropsWithChildren } from 'react'
import toast from 'react-hot-toast'
import { BsGithub, BsGoogle } from 'react-icons/bs'

import { signIn, signOut } from 'next-auth/react'

import copyProfileUrl from '@/lib/copyProfileUrl'

const buttonVariants = cva('mb-2', {
  variants: {
    variant: {
      primary: 'bg-slate-800 text-white hover:bg-slate-950 rounded-lg',
      secondary: 'bg-slate-100 text-slate-950 hover:bg-slate-200 rounded-lg',
      link: 'text-xl underline hover:text-slate-950',
    },
    size: {
      sm: 'px-3 py-2',
      md: 'px-5 py-2.5',
      lg: 'px-5 py-3',
    },
    isIcon: { true: 'inline-flex items-center justify-center gap-2' },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    isIcon: false,
  },
})

export type ButtonProps = PropsWithChildren &
  ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export function Button({
  variant,
  size,
  isIcon,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, isIcon, className })}
      {...rest}
    >
      {children}
    </button>
  )
}

export function SignOut() {
  return (
    <Button variant='link' onClick={() => signOut()}>
      Sign Out
    </Button>
  )
}
export function GoogleSignInButton() {
  return (
    <Button variant='secondary' isIcon onClick={() => signIn('google')}>
      Continue with Google <BsGoogle />
    </Button>
  )
}

export function GithubSignInButton() {
  return (
    <Button isIcon variant='secondary' onClick={() => signIn('github')}>
      Continue with GitHub <BsGithub />
    </Button>
  )
}

export const SignInButton = () => {
  return (
    <Button variant='secondary' onClick={() => signIn()}>
      Sign In
    </Button>
  )
}

export const ShareProfileButton = ({ username }: { username: string }) => {
  const handleClick = async () => {
    const isSuccess = await copyProfileUrl(username)
    isSuccess && toast.success('Copied to clipboard')
  }
  return <Button onClick={handleClick}>Share Profile</Button>
}
