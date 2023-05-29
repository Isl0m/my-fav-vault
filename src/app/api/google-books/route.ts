import { getBooksSearch } from '@/lib/search-from-api'
import {
  GoogleBookResponse,
  GoogleBooksSearch,
} from '@/schemas/google-books.schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }

  const booksResponse: GoogleBooksSearch = await getBooksSearch({
    query,
    limit: 5,
  })

  if (!booksResponse.items) {
    return new Response('Not Found', { status: 404 })
  }

  const books: GoogleBookResponse[] = booksResponse.items
    .slice(0, 5)
    .map(book => ({
      googleBooksId: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors?.join(', ') || '',
      publishedDate: book.volumeInfo.publishedDate || '',
      thumbnail: book.volumeInfo.imageLinks?.smallThumbnail || null,
    }))

  return new Response(JSON.stringify(books), { status: 200 })
}
