import prisma from '@/lib/prisma'
import { UserOptionSchema } from '@/schemas/user-option.schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    const users = await prisma.user.findMany({
      take: 4,
      select: {
        username: true,
        email: true,
        image: true,
      },
    })
    return new Response(JSON.stringify(users), { status: 200 })
  }

  const users = await prisma.user.findMany({
    where: {
      AND: [
        {
          username: {
            not: null,
          },
        },
        {
          email: {
            not: null,
          },
        },
      ],
    },
    select: {
      username: true,
      email: true,
      image: true,
    },
  })

  if (!users.length) {
    return new Response('Users not found', { status: 404 })
  }

  const filteredUsers = users.filter(user => {
    const result = UserOptionSchema.safeParse(user)
    return (
      result.success &&
      (result.data.username.includes(query) ||
        result.data.email.includes(query))
    )
  })

  if (!filteredUsers.length) {
    return new Response('Users not found', { status: 404 })
  }

  return new Response(JSON.stringify(filteredUsers), { status: 200 })
}
