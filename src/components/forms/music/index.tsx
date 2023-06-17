import { getServerSession } from 'next-auth'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

import { MusicInput } from './music.input'

async function getMusics() {
  const session = await getServerSession(authOptions)
  if (!session) return
  return await prisma.userMusic.findMany({
    where: {
      user: {
        id: session.user.id,
      },
    },
  })
}

export async function MusicForm() {
  const musics = await getMusics()

  return (
    <Card>
      <CardHeader>
        <CardTitle className='mb-2 text-lg font-semibold'>
          Your 3 fav musics
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <MusicInput userMusic={musics?.[0]} />
        <MusicInput userMusic={musics?.[1]} />
        <MusicInput userMusic={musics?.[2]} />
      </CardContent>
    </Card>
  )
}
