import 'server-only'

import { Session, User, getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'

import { NotNullable } from './utils'

type ValidatedUser = Required<NotNullable<Pick<User, 'username'>>> &
  Omit<User, 'username'>

type ValidatedSession = Session & {
  user: ValidatedUser
}

function validateSession(session: Session | null): session is ValidatedSession {
  return session !== null && typeof session.user.username === 'string'
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

export async function checkUsernameAndRedirect() {
  const session = await getServerSession(authOptions)
  if (session && !session?.user.username) return redirect('/username')
}

export async function checkSessionAndRedirect() {
  const session = await getServerSession(authOptions)
  if (!!session) return redirect('/profile')
}
