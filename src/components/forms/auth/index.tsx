'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/buttons'
import {
  AuthFormFields,
  AuthFormProps,
} from '@/components/forms/auth/auth.types'

import {
  EmailAuthInput,
  PasswordAuthInput,
  UsernameAuthInput,
} from './auth.input'

export function AuthForm({ usernames }: AuthFormProps) {
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
    const res = await signIn('credentials', {
      ...value,
      authMethod,
      callbackUrl: '/profile',
      redirect: false,
    })
    if (!res?.error) {
      router.replace('/profile')
    }
    reset()
  }

  return (
    <>
      <form
        className='flex w-full flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-center text-4xl font-bold text-slate-900'>
          {isSignin ? 'Sing in' : 'Sign up'}
        </h1>

        {!isSignin && (
          <UsernameAuthInput
            register={register}
            errors={errors}
            usernames={usernames}
          />
        )}

        <EmailAuthInput register={register} errors={errors} />
        <PasswordAuthInput register={register} errors={errors} />

        <Button>Submit</Button>
      </form>
      <div className='mt-1 inline-flex w-full justify-center gap-2'>
        <span className='text-slate-400'>
          {isSignin ? "Don't have an account?" : 'Have an account?'}
        </span>
        <button className='underline' onClick={toggleAuthMethod}>
          {isSignin ? 'Sign Up Now' : 'Sign In Now'}
        </button>
      </div>
    </>
  )
}
