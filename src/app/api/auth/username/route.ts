import { NextRequest } from 'next/server'

import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const { email, username } = await request.json()

  const existingUser = await prisma.user.findFirst({
    where: { username },
  })

  if (existingUser) {
    return new Response('User with this username already exists', {
      status: 400,
      statusText: 'User with this username already exists',
    })
  }

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { username },
  })

  return new Response(JSON.stringify(updatedUser), { status: 200 })
}
