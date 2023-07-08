'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

import { setUsernameSchema } from '@/lib/validators/auth'
import { UsernameUpdateRequest } from '@/schemas/username.schema'

import { Icons } from '../icons'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

type Inputs = z.infer<typeof setUsernameSchema>

export function UsernameForm() {
  const [isLoading, setIsLoading] = useState(false)

  const { data: session, update } = useSession()
  const form = useForm<Inputs>({
    mode: 'onChange',
    resolver: zodResolver(setUsernameSchema),
    defaultValues: {
      username: '',
    },
  })

  const router = useRouter()

  const onSubmit = async ({ username }: Inputs) => {
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
      form.setError('username', { message: req.statusText })
      return null
    }

    await update({ username })
    setIsLoading(false)
    router.push('/profile')
  }

  return (
    <Form {...form}>
      <form
        className='flex w-96 flex-col gap-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Enter username...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading}>
          {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
          Submit
        </Button>
      </form>
    </Form>
  )
}
