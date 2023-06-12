
import prisma from '@/lib/prisma'
import { usernameUpdateRequestSchema } from '@/schemas/username.schema'

export async function POST(request: Request) {
  const req = await request.json()

  const { username, email } = usernameUpdateRequestSchema.parse(req)

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
