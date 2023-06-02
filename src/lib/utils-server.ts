import { ClassValue, clsx } from 'clsx'
import 'server-only'
import { twMerge } from 'tailwind-merge'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'

export async function getSessionOrRedirectServer(redirectUrl = '/') {
  const session = await getServerSession(authOptions)

  if (!session) return redirect(redirectUrl)
  return session
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
