import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { getServerSession } from '@/lib/auth'
import prisma from '@/lib/prisma'

import { MovieInput } from './movie-input'

async function getMovies() {
  const session = await getServerSession()
  if (!session) return
  return await prisma.movie.findMany({
    where: {
      user: {
        some: {
          id: session.user.id,
        },
      },
    },
  })
}

export async function MovieForm() {
  const movies = await getMovies()

  return (
    <Card className='w-80'>
      <CardHeader>
        <CardTitle className='mb-2 text-lg font-semibold'>
          Your 3 fav movies
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <MovieInput movie={movies?.[0]} />
        <MovieInput movie={movies?.[1]} />
        <MovieInput movie={movies?.[2]} />
      </CardContent>
    </Card>
  )
}
