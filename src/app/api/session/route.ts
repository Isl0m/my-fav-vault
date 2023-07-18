import { NextResponse } from 'next/server'

import { getServerSession } from '@/lib/auth'

export async function GET(request: Request) {
  const session = await getServerSession()

  return NextResponse.json({
    authenticated: !!session,
    session,
  })
}
