import { getServerSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { userServiceSchema } from '@/schemas/user-service.schema'

export async function GET(request: Request) {
  const session = await getServerSession()
  if (!session) {
    return new Response('No session', { status: 401 })
  }

  const movies = await prisma.music.findMany({
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
  const { id: musicId, ...music } = userServiceSchema.parse(req)

  const session = await getServerSession()

  if (!session) {
    return new Response('No session', { status: 401 })
  }
  const { id } = session.user
  const existsMusic = await prisma.music.findUnique({
    where: {
      serviceId: music.serviceId,
    },
  })

  if (existsMusic) {
    try {
      const updatedMusic = await prisma.music.update({
        where: { serviceId: music.serviceId },
        data: {
          user: {
            connect: {
              id,
            },
          },
        },
      })
      await prisma.music.update({
        where: { id: musicId },
        data: {
          user: {
            disconnect: {
              id,
            },
          },
        },
      })

      return new Response(JSON.stringify(updatedMusic), { status: 200 })
    } catch (e) {
      return new Response(JSON.stringify(e), { status: 400 })
    }
  }

  const createdMusic = await prisma.music.create({
    data: {
      ...music,
      user: {
        connect: {
          id,
        },
      },
    },
  })

  await prisma.music.update({
    where: { id: musicId },
    data: {
      user: {
        disconnect: {
          id,
        },
      },
    },
  })

  return new Response(JSON.stringify(createdMusic), { status: 200 })
}
