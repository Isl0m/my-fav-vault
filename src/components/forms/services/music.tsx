import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { getServerSession } from '@/lib/auth'
import prisma from '@/lib/prisma'

import { MusicInput } from './music-input'

async function getMusics() {
  const session = await getServerSession()
  if (!session) return
  return await prisma.music.findMany({
    where: {
      user: {
        some: {
          id: session.user.id,
        },
      },
    },
  })
}

export async function MusicForm() {
  const musics = await getMusics()

  return (
    <Card className='w-80'>
      <CardHeader>
        <CardTitle className='mb-2 text-lg font-semibold'>
          Your 3 fav musics
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <MusicInput music={musics?.[0]} />
        <MusicInput music={musics?.[1]} />
        <MusicInput music={musics?.[2]} />
      </CardContent>
    </Card>
  )
}
