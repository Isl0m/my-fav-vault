'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { ComponentProps, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Icons } from '@/components/Icons'
import {
  AuthFormFields,
  AuthFormProps,
} from '@/components/forms/auth/auth.types'
import { GithubSignInButton, GoogleSignInButton } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import {
  EmailAuthInput,
  PasswordAuthInput,
  UsernameAuthInput,
} from './auth.input'

type Props = ComponentProps<'div'> & AuthFormProps

export function AuthForm({ usernames, className, ...props }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [authMethod, setAuthMethod] = useState<'signin' | 'signup'>('signin')
  const isSignin = authMethod === 'signin'
  const toggleAuthMethod = () => setAuthMethod(isSignin ? 'signup' : 'signin')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormFields>({
    mode: 'onChange',
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<AuthFormFields> = async value => {
    setIsLoading(true)
    const res = await signIn('credentials', {
      ...value,
      authMethod,
      callbackUrl: '/profile',
      redirect: false,
    })
    if (res?.error) {
      toast.error('Authentication failed')
      setIsLoading(false)
      return
    }
    setIsLoading(false)
    router.replace('/profile')
    reset()
  }

  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          {isSignin ? 'Sign in' : 'Create an account'}
        </h1>
        <p className='text-sm text-muted-foreground'>
          Enter your credentials below to{' '}
          {isSignin ? 'sign in' : 'create your account'}
        </p>
      </div>
      <div className={cn('grid gap-6', className)} {...props}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <div className='grid gap-2'>
              {!isSignin && (
                <UsernameAuthInput
                  register={register}
                  errors={errors}
                  usernames={usernames}
                />
              )}
              <EmailAuthInput register={register} errors={errors} />
              <PasswordAuthInput register={register} errors={errors} />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              )}
              {isSignin ? 'Sign In' : 'Sign up'} with Email
            </Button>
          </div>
        </form>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              Or continue with
            </span>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <GoogleSignInButton />
          <GithubSignInButton />
        </div>

        <div className='inline-flex justify-center gap-2'>
          <span className='text-slate-400'>
            {isSignin ? "Don't have an account?" : 'Have an account?'}
          </span>
          <button className='underline' onClick={toggleAuthMethod}>
            {isSignin ? 'Sign Up Now' : 'Sign In Now'}
          </button>
        </div>
      </div>
    </div>
  )
}
