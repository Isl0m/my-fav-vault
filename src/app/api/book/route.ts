import { z } from 'zod'

import { GOOGLE_BOOKS } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }
  const limit = 3

  try {
    const books = await GOOGLE_BOOKS.getBooks({ query })

    if (!books?.length) {
      return new Response('Book not found', { status: 404 })
    }

    return new Response(JSON.stringify(books.slice(0, limit)), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 404 })
    }
    return new Response(null, { status: 404 })
  }
}
