import 'server-only'

import { Session, User, getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'

import { NotNullable, Prettify } from './utils'

type ValidatedUser = Required<NotNullable<Pick<User, 'image' | 'username'>>> &
  Omit<User, 'image' | 'username'>

type ValidatedSession = Session & {
  user: ValidatedUser
}

function validateSession(session: Session | null): session is ValidatedSession {
  return (
    session !== null &&
    typeof session.user.username === 'string' &&
    typeof session.user.image === 'string'
  )
}

export async function getSessionOrRedirect(
  redirectUrl = '/'
): Promise<ValidatedSession> {
  const session = await getServerSession(authOptions)

  if (validateSession(session)) {
    return session
  }
  return redirect(redirectUrl)
}

export async function getUsernameOrRedirect() {
  const session = await getServerSession(authOptions)
  if (session && !session?.user.username) return redirect('/username')
}

export async function checkSessionAndRedirect() {
  const session = await getServerSession(authOptions)
  if (!!session) return redirect('/profile')
}
