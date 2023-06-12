import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { userServiceSchema } from '@/schemas/user-service.schema'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response('No session', { status: 401 })
  }

  const movies = await prisma.userMusic.findMany({
    where: {
      user: {
        id: session.user.id,
      },
    },
  })

  return new Response(JSON.stringify(movies), { status: 200 })
}

export async function POST(request: Request) {
  const req = await request.json()
  const { id, ...music } = userServiceSchema.parse(req)

  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('No session', { status: 401 })
  }

  const existsMusic =
    id &&
    (await prisma.userMusic.findUnique({
      where: { id },
    }))

  if (existsMusic) {
    try {
      const updatedMusic = await prisma.userMusic.update({
        where: { id },
        data: music,
      })

      return new Response(JSON.stringify(updatedMusic), { status: 200 })
    } catch (e) {
      return new Response(JSON.stringify(e), { status: 400 })
    }
  }

  const createdMusic = await prisma.userMusic.create({
    data: {
      ...music,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  })

  return new Response(JSON.stringify(createdMusic), { status: 200 })
}
