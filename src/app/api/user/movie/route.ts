import { getServerSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { userServiceSchema } from '@/schemas/user-service.schema'

export async function GET(request: Request) {
  const session = await getServerSession()
  if (!session) {
    return new Response('No session', { status: 401 })
  }

  const movies = await prisma.movie.findMany({
    where: {
      user: {
        some: {
          id: session.user.id,
        },
      },
    },
  })

  return new Response(JSON.stringify(movies), { status: 200 })
}

export async function POST(request: Request) {
  const req = await request.json()
  const { id: movieId, ...movie } = userServiceSchema.parse(req)

  const session = await getServerSession()

  if (!session) {
    return new Response('No session', { status: 401 })
  }
  const { id } = session.user

  const existsMovie = await prisma.movie.findUnique({
    where: {
      serviceId: movie.serviceId,
    },
  })

  if (existsMovie) {
    try {
      const updatedMovie = await prisma.movie.update({
        where: { serviceId: movie.serviceId },
        data: {
          user: {
            connect: {
              id,
            },
          },
        },
      })

      await prisma.movie.update({
        where: { id: movieId },
        data: {
          user: {
            disconnect: {
              id,
            },
          },
        },
      })

      return new Response(JSON.stringify(updatedMovie), { status: 200 })
    } catch (e) {
      return new Response(JSON.stringify(e), { status: 400 })
    }
  }

  const createdMovie = await prisma.movie.create({
    data: {
      ...movie,
      user: {
        connect: {
          id,
        },
      },
    },
  })

  await prisma.movie.update({
    where: { id: movieId },
    data: {
      user: {
        disconnect: {
          id,
        },
      },
    },
  })

  return new Response(JSON.stringify(createdMovie), { status: 200 })
}
