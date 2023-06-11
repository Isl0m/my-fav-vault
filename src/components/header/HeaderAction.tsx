'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { SignOut } from '@/components/buttons'

export function HeaderAction() {
  const { status } = useSession()

  if (status === 'authenticated') return <SignOut />

  return (
    <Link href={'/auth'} className=' text-xl underline hover:text-slate-950'>
      Sign in
    </Link>
  )
}
