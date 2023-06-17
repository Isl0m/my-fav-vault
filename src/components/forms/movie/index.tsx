import { getServerSession } from 'next-auth'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

import { MovieInput } from './movie.input'

async function getMovies() {
  const session = await getServerSession(authOptions)
  if (!session) return
  return await prisma.userMovie.findMany({
    where: {
      user: {
        id: session.user.id,
      },
    },
  })
}

export async function MovieForm() {
  const movies = await getMovies()

  return (
    <Card>
      <CardHeader>
        <CardTitle className='mb-2 text-lg font-semibold'>
          Your 3 fav movies
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <MovieInput userMovie={movies?.[0]} />
        <MovieInput userMovie={movies?.[1]} />
        <MovieInput userMovie={movies?.[2]} />
      </CardContent>
    </Card>
  )
}
