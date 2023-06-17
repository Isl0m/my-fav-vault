'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { SignOut } from '@/components/ui/button'

export function HeaderAction() {
  const { status } = useSession()

  if (status === 'authenticated') return <SignOut />

  return (
    <Link href={'/auth'} className='underline hover:text-slate-950'>
      Sign in
    </Link>
  )
}
