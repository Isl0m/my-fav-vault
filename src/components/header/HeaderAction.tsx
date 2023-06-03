import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { SignOut } from '@/components/buttons'
import { authOptions } from '@/lib/auth'

export async function HeaderAction() {
  const session = await getServerSession(authOptions)

  if (session) return <SignOut />

  return (
    <Link href={'/auth'} className='text-xl underline hover:text-slate-950'>
      Sign in
    </Link>
  )
}
