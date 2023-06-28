'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { Button, SignOut } from '@/components/ui/button'

export function HeaderAction() {
  const { status } = useSession()

  if (status === 'authenticated') return <SignOut />

  return (
    <Button variant='link' className='text-base'>
      <Link href={'/signin'}>Sign in</Link>
    </Button>
  )
}
