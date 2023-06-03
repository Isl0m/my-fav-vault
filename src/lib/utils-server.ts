import 'server-only'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'

export async function getSessionOrRedirect(redirectUrl = '/') {
  const session = await getServerSession(authOptions)

  if (!session) return redirect(redirectUrl)
  return session
}

export async function getUsernameOrRedirect() {
  const session = await getServerSession(authOptions)
  if (session && !session?.user.username) return redirect('/username')
}

export async function checkSessionAndRedirect() {
  const session = await getServerSession(authOptions)
  if (!!session) return redirect('/profile')
}
