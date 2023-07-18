import prisma from '@/lib/prisma'
import { imageUpdateRequestSchema } from '@/schemas/user-image.schema'

export async function POST(request: Request) {
  const req = await request.json()

  const { username, image } = imageUpdateRequestSchema.parse(req)

  const updatedUser = await prisma.user.update({
    where: { username },
    data: { image },
  })

  return new Response(JSON.stringify(updatedUser), { status: 200 })
}
