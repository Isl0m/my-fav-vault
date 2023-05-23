'use client'

import { User } from '@prisma/client'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/buttons.component'
import { Input } from '@/components/input.component'

export type UsernameForm = Pick<User, 'username'>

export const UsernameForm = () => {
  const { data: session, status, update } = useSession()
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
    const req = await fetch('/api/auth/username', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email: session?.user.email,
      }),
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
      <Input<UsernameForm>
        name='User Name'
        label='username'
        type='text'
        register={register}
        options={{
          required: { value: true, message: 'Username is required' },
        }}
        placeholder='@'
        error={errors.username}
      />

      <Button>Submit</Button>
    </form>
  )
}
