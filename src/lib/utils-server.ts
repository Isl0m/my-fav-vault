import 'server-only'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'

export async function getSessionOrRedirect(redirectUrl = '/') {
  const session = await getServerSession(authOptions)

  if (!session) return redirect(redirectUrl)
  return session
}
