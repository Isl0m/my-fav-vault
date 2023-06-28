'use client'

import { signIn, signOut } from 'next-auth/react'

import * as React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'

import copyProfileUrl from '@/lib/copyProfileUrl'
import { cn } from '@/lib/utils'

import { Icons } from '../Icons'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },

    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...rest }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...rest}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

export function SignOut() {
  return (
    <Button variant='link' onClick={() => signOut({ callbackUrl: '/signin' })}>
      Sign Out
    </Button>
  )
}
export function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = async () => {
    setIsLoading(true)
    const res = await signIn('github')
    if (res?.ok || !res?.error) {
      setIsLoading(false)
      return
    }
    toast.error(res.error)
  }
  return (
    <Button
      variant='outline'
      type='button'
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? (
        <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <Icons.google className='mr-2 h-4 w-4' />
      )}{' '}
      Google
    </Button>
  )
}

export function GithubSignInButton() {
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = async () => {
    setIsLoading(true)
    const res = await signIn('github')
    if (res?.ok || !res?.error) {
      setIsLoading(false)
      return
    }
    toast.error(res.error)
  }
  return (
    <Button
      variant='outline'
      type='button'
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? (
        <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <Icons.gitHub className='mr-2 h-4 w-4' />
      )}{' '}
      Github
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
