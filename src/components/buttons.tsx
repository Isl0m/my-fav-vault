'use client'

import { VariantProps, cva } from 'class-variance-authority'
import { ComponentProps, type FC, type PropsWithChildren } from 'react'
import { BsGithub, BsGoogle } from 'react-icons/bs'

import { signIn, signOut } from 'next-auth/react'

const buttonVariants = cva('mb-2  rounded-lg', {
  variants: {
    variant: {
      primary: 'bg-slate-800 text-white hover:bg-slate-950',
      secondary: 'bg-slate-100 text-slate-950 hover:bg-slate-200',
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

export const Button: FC<ButtonProps> = ({
  variant,
  size,
  isIcon,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={buttonVariants({ variant, size, isIcon, className })}
      {...rest}
    >
      {children}
    </button>
  )
}

export const SignOut = () => {
  return (
    <Button variant='secondary' onClick={() => signOut()}>
      Sign Out
    </Button>
  )
}
export const GoogleSignInButton = () => {
  return (
    <Button
      variant='secondary'
      isIcon
      onClick={() => signIn('google', { callbackUrl: '/username' })}
    >
      Continue with Google <BsGoogle />
    </Button>
  )
}

export const GithubSignInButton = () => {
  return (
    <Button
      isIcon
      variant='secondary'
      onClick={() => signIn('github', { callbackUrl: '/username' })}
    >
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
