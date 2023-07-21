import { GOOGLE_BOOKS } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }
  const limit = 3

  const books = await GOOGLE_BOOKS.getBooks({ query })

  if (!books?.length) {
    return new Response('Book not found', { status: 404 })
  }

  return new Response(JSON.stringify(books.slice(0, limit)), { status: 200 })
}
