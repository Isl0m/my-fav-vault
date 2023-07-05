'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { User } from '@prisma/client'

import { Button } from '@/components/ui/button'

import { UsernameUpdateRequest } from '@/schemas/username.schema'

import { Icons } from '../icons'
import { Input } from '../ui/input'

export type UsernameForm = Pick<User, 'username'>

export function UsernameForm() {
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    const payload: UsernameUpdateRequest = {
      username,
      email: session.user.email,
    }
    const req = await fetch('/api/auth/username', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    if (!req.ok) {
      setIsLoading(false)
      setError('username', { message: req.statusText })
      return null
    }

    await update({ username })
    setIsLoading(false)
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

      <Button disabled={isLoading}>
        {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
        Submit
      </Button>
    </form>
  )
}
