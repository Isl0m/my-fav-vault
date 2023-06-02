import prisma from '@/lib/prisma'

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
