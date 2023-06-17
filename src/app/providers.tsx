'use client'

import { SessionProvider } from 'next-auth/react'

import { Toaster } from 'react-hot-toast'

import { TailwindIndicator } from '@/components/tailwind-indicator'

type Props = {
  children?: React.ReactNode
}

export function NextAuthProvider({ children }: Props) {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster position='top-right' />
      <TailwindIndicator />
    </>
  )
}
