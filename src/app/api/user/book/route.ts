import { getServerSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { userServiceSchema } from '@/schemas/user-service.schema'

export async function GET(request: Request) {
  const session = await getServerSession()
  if (!session) {
    return new Response('No session', { status: 401 })
  }

  const books = await prisma.book.findMany({
    where: {
      user: {
        some: {
          id: session.user.id,
        },
      },
    },
  })

  return new Response(JSON.stringify(books), { status: 200 })
}

export async function POST(request: Request) {
  const req = await request.json()
  const book = userServiceSchema.parse(req)

  const session = await getServerSession()
  console.log(session)

  if (!session) {
    return new Response('No session', { status: 401 })
  }

  const { id } = session.user

  const existsBook = await prisma.book.findUnique({
    where: {
      serviceId: book.serviceId,
    },
  })

  if (existsBook) {
    try {
      const updatedBook = await prisma.book.update({
        where: {
          serviceId: book.serviceId,
        },
        data: {
          user: {
            connect: {
              id,
            },
          },
        },
      })

      return new Response(JSON.stringify(updatedBook), { status: 200 })
    } catch (e) {
      return new Response(JSON.stringify(e), { status: 400 })
    }
  }

  const createdBook = await prisma.book.create({
    data: {
      ...book,
      user: {
        connect: {
          id,
        },
      },
    },
  })

  return new Response(JSON.stringify(createdBook), { status: 200 })
}
