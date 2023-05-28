'use client'

import { VariantProps, cva } from 'class-variance-authority'
import { ComponentProps, type FC, type PropsWithChildren } from 'react'
import { BsGithub, BsGoogle } from 'react-icons/bs'

import { signIn, signOut } from 'next-auth/react'

const buttonVariants = cva(
  'mb-2 inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium',
  {
    variants: {
      variant: {
        primary:
          'bg-purple-500 text-white hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700',
        secondary:
          'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100  focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700',
      },
      size: {
        sm: 'px-3 py-2',
        md: 'px-5 py-2.5',
        lg: 'px-5 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export type ButtonProps = PropsWithChildren &
  ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export const Button: FC<ButtonProps> = ({
  variant,
  size,
  className,
  children,
  ...rest
}) => {
  return (
    <button className={buttonVariants({ variant, size, className })} {...rest}>
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
      onClick={() => signIn('google', { callbackUrl: '/username' })}
    >
      Continue with Google <BsGoogle />
    </Button>
  )
}

export const GithubSignInButton = () => {
  return (
    <Button
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
