import { GOOGLE_BOOKS } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }
  const limit = 3

  const booksResponse = await GOOGLE_BOOKS.getBooks({ query })

  if (
    booksResponse === null ||
    !booksResponse.items ||
    booksResponse.totalItems === 0
  ) {
    return new Response('Book not found', { status: 404 })
  }

  const books = GOOGLE_BOOKS.toUserService(booksResponse.items.slice(0, limit))

  return new Response(JSON.stringify(books), { status: 200 })
}
