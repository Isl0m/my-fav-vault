import { getBooksSearch } from '@/lib/search-from-api'
import { GoogleBooksSearch } from '@/schemas/google-books.schema'
import { UserService } from '@/schemas/user-service.schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }

  const booksResponse: GoogleBooksSearch = await getBooksSearch({
    query,
  })

  if (!booksResponse.items) {
    return new Response('Not Found', { status: 404 })
  }

  const books: UserService[] = booksResponse.items.slice(0, 3).map(book => ({
    serviceId: book.id,
    title: book.volumeInfo.title,
    subTitle: book.volumeInfo.authors?.join(', ') || null,
    previewImage: book.volumeInfo.imageLinks?.smallThumbnail || null,
  }))

  return new Response(JSON.stringify(books), { status: 200 })
}
