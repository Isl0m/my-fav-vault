import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { userServiceSchema } from '@/schemas/user-service.schema'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response('No session', { status: 401 })
  }

  const movies = await prisma.userMovie.findMany({
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
  const { id, ...movie } = userServiceSchema.parse(req)

  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('No session', { status: 401 })
  }

  const existsMovie =
    id &&
    (await prisma.userMovie.findUnique({
      where: { id },
    }))

  if (existsMovie) {
    try {
      const updatedMovie = await prisma.userMovie.update({
        where: { id },
        data: movie,
      })

      return new Response(JSON.stringify(updatedMovie), { status: 200 })
    } catch (e) {
      return new Response(JSON.stringify(e), { status: 400 })
    }
  }

  const createdMovie = await prisma.userMovie.create({
    data: {
      ...movie,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  })

  return new Response(JSON.stringify(createdMovie), { status: 200 })
}
