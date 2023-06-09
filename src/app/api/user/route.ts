import prisma from '@/lib/prisma'
import { imageUpdateRequestSchema } from '@/schemas/user-image.schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return new Response('No username param', { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      userBook: true,
      userMusic: true,
      userMovie: true,
    },
  })

  if (!user) {
    return new Response('User not found', { status: 404 })
  }

  return new Response(JSON.stringify(user), { status: 200 })
}

export async function POST(request: Request) {
  const req = await request.json()

  const {  username, image } = imageUpdateRequestSchema.parse(req)

  const updatedUser = await prisma.user.update({
    where: { username },
    data: { image },
  })

  return new Response(JSON.stringify(updatedUser), { status: 200 })
}
