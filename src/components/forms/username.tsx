'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { SubmitHandler, useForm } from 'react-hook-form'

import { User } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { UsernameUpdateRequest } from '@/schemas/username.schema'

import { Input } from '../ui/input'
import { Label } from '../ui/label'

export type UsernameForm = Pick<User, 'username'>

export function UsernameForm() {
  const { data: session, update } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UsernameForm>()

  const router = useRouter()

  const onSubmit: SubmitHandler<UsernameForm> = async ({ username }) => {
    if (!username || !session?.user.email) {
      return null
    }
    const payload: UsernameUpdateRequest = {
      username,
      email: session.user.email,
    }
    const req = await fetch('/api/auth/username', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    if (!req.ok) {
      setError('username', { message: req.statusText })
      return null
    }

    await update({ username })
    router.push('/profile')
  }

  return (
    <form
      className='flex w-96 flex-col gap-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        id='username'
        type='text'
        {...register('username', {
          required: { value: true, message: 'Username is required' },
        })}
        placeholder='Enter username...'
      />
      {errors.username && (
        <p className='text-sm font-medium text-destructive'>
          {errors.username.message}
        </p>
      )}

      <Button>Submit</Button>
    </form>
  )
}
