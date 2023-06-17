'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { SubmitHandler, useForm } from 'react-hook-form'

import { User } from '@prisma/client'

import { HookFormField } from '@/components/input'
import { Button } from '@/components/ui/button'
import { UsernameUpdateRequest } from '@/schemas/username.schema'

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
      <HookFormField<UsernameForm>
        name='User Name'
        id='username'
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
