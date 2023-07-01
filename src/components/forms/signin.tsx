'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signInSchema } from '@/lib/validators/auth'

type Inputs = z.infer<typeof signInSchema>

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<Inputs>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  })

  const router = useRouter()

  const onSubmit = async (values: Inputs) => {
    setIsLoading(true)
    const res = await signIn('credentials', {
      ...values,
      authMethod: 'signin',
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
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='example@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='******' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
          {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
          Sign in
        </Button>
      </form>
    </Form>
  )
}
