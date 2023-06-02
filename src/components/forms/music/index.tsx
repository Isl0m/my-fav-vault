import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

import { MusicInput } from './music.input'

const getMusics = async () => {
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

export const MusicForm = async () => {
  const musics = await getMusics()

  return (
    <div>
      <h3 className='mb-2 text-lg font-semibold'>Your 3 fav musics</h3>
      <div className='flex flex-col gap-2 rounded-xl bg-slate-100 p-4'>
        <MusicInput userMusic={musics?.[0]} />
        <MusicInput userMusic={musics?.[1]} />
        <MusicInput userMusic={musics?.[2]} />
      </div>
    </div>
  )
}
