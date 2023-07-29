import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getServerSession } from '@/lib/auth'
import prisma from '@/lib/prisma'

import { BookInput } from './book-input'

async function getBooks() {
  const session = await getServerSession()
  if (!session) return
  return await prisma.book.findMany({
    where: {
      user: {
        some: {
          id: session.user.id,
        },
      },
    },
  })
}

export async function BookForm() {
  const books = await getBooks()

  return (
    <Card className='w-80'>
      <CardHeader>
        <CardTitle className='mb-2 text-lg font-semibold'>
          Your 3 books
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <BookInput book={books?.[0]} />
        <BookInput book={books?.[1]} />
        <BookInput book={books?.[2]} />
      </CardContent>
    </Card>
  )
}
