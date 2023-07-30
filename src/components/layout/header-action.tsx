'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function HeaderAction() {
  const { status } = useSession()

  if (status === 'authenticated')
    return (
      <Button
        variant='link'
        onClick={() => signOut({ callbackUrl: '/signin' })}
      >
        Sign Out
      </Button>
    )

  return (
    <Button variant='link' className='text-base'>
      <Link href={'/signin'}>Sign in</Link>
    </Button>
  )
}
