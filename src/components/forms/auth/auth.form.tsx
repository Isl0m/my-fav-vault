'use client'

import { User } from '@prisma/client'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/buttons.component'

import { AuthInput } from './auth.input'

export type AuthForm = Omit<User, 'id'>
type usernames = { username: string | null }[]
type Props = {
  usernames: usernames
}

const getUsernameRegex = (usernames: usernames) => {
  const filtredUsernames = usernames
    .map(item => `(?!${item.username})`)
    .join('')
  if (filtredUsernames.includes('undefinde')) {
    return new RegExp('')
  }
  const usernameRegexp = new RegExp(`^(${filtredUsernames}.)*$`)

  return usernameRegexp
}

export const AuthForm: FC<Props> = ({ usernames }) => {
  const [authMethod, setAuthMethod] = useState<'signin' | 'signup'>('signin')
  const isSignin = authMethod === 'signin'
  const toggleAuthMethod = () => setAuthMethod(isSignin ? 'signup' : 'signin')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthForm>({
    mode: 'onChange',
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<AuthForm> = async value => {
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
        className='flex w-96 flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        {!isSignin && (
          <AuthInput
            name='User Name'
            label='username'
            type='text'
            register={register}
            options={{
              required: { value: true, message: 'Username is required' },
              pattern: {
                value: getUsernameRegex(usernames),
                message: 'This username already occupied',
              },
            }}
            placeholder='@'
            error={errors.username}
          />
        )}

        <AuthInput
          name='Email'
          label='email'
          type='email'
          register={register}
          options={{
            required: { value: true, message: 'Email is required' },
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Enter valid email',
            },
          }}
          placeholder='example@example.com'
          error={errors.email}
        />

        <AuthInput
          name='Password'
          label='password'
          type='password'
          register={register}
          options={{
            required: { value: true, message: 'Password is required' },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
              message:
                'Password should have 1 uppercase, 1 lowercase, 1 number, and be at least 6 letters long.',
            },
          }}
          placeholder='******'
          error={errors.password}
        />
        <Button>Submit</Button>
      </form>
      <div className='inline-flex w-full justify-center gap-2 text-sm'>
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
