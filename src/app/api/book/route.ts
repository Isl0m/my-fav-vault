import { GOOGLE_BOOKS, KITSU } from '@/lib/api'
import { GoogleBooksSearch } from '@/schemas/google-books.schema'
import { KitsuMangaSearch } from '@/schemas/kitsu.schema'
import { UserService } from '@/schemas/user-service.schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }
  const limit = 3

  const booksResponse: [GoogleBooksSearch, KitsuMangaSearch] =
    await Promise.all([
      GOOGLE_BOOKS.getBooks({ query }),
      KITSU.getManga({ query, limit }),
    ])

  let books: UserService[]
  const googleBooksResultCount = booksResponse[0].totalItems
  const kitsuResultCount = booksResponse[1].meta.count

  if (
    googleBooksResultCount > 0 &&
    kitsuResultCount > 0 &&
    booksResponse[0].items
  ) {
    const animeCount = googleBooksResultCount >= 2 ? 1 : 2
    books = [
      ...GOOGLE_BOOKS.toUserService(
        booksResponse[0].items.slice(0, limit - animeCount)
      ),
      ...KITSU.toUserService(booksResponse[1].data.slice(0, animeCount)),
    ]
  } else if (googleBooksResultCount === 0 || !booksResponse[0].items) {
    books = KITSU.toUserService(booksResponse[1].data)
  } else {
    books = GOOGLE_BOOKS.toUserService(booksResponse[0].items.slice(0, limit))
  }

  return new Response(JSON.stringify(books), { status: 200 })
}
