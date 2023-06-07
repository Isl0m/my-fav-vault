import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { userServiceSchema } from '@/schemas/user-service.schema'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response('No session', { status: 401 })
  }

  const books = await prisma.userBook.findMany({
    where: {
      user: {
        id: session.user.id,
      },
    },
  })

  return new Response(JSON.stringify(books), { status: 200 })
}

export async function POST(request: NextRequest) {
  const req = await request.json()
  const { id, ...book } = userServiceSchema.parse(req)

  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('No session', { status: 401 })
  }

  const existsBook =
    id &&
    (await prisma.userBook.findUnique({
      where: { id },
    }))

  if (existsBook) {
    try {
      const updatedBook = await prisma.userBook.update({
        where: { id },
        data: book,
      })

      return new Response(JSON.stringify(updatedBook), { status: 200 })
    } catch (e) {
      return new Response(JSON.stringify(e), { status: 400 })
    }
  }

  const createdBook = await prisma.userBook.create({
    data: {
      ...book,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  })

  return new Response(JSON.stringify(createdBook), { status: 200 })
}
