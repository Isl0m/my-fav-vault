import { getServerSession } from 'next-auth'

import { BookInput } from '@/components/forms/book/book.input'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

async function getBooks() {
  const session = await getServerSession(authOptions)
  if (!session) return
  return await prisma.userBook.findMany({
    where: {
      user: {
        id: session.user.id,
      },
    },
  })
}

export async function BookForm() {
  const books = await getBooks()

  return (
    <div>
      <h3 className='mb-2 text-lg font-semibold'>Your 3 fav books</h3>
      <div className='flex flex-col gap-2 rounded-2xl bg-slate-100 p-4'>
        <BookInput userBook={books?.[0]} />
        <BookInput userBook={books?.[1]} />
        <BookInput userBook={books?.[2]} />
      </div>
    </div>
  )
}
