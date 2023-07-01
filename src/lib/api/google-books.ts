import { SearchQueryPrams } from '.'

import { GoogleBook, GoogleBooksSearch } from '@/schemas/google-books.schema'
import { UserService } from '@/schemas/user-service.schema'

export const GOOGLE_BOOKS = {
  GOOGLE_BOOKS_BASE_URL: 'https://www.googleapis.com/books/v1/',

  async getBooks({
    query,
  }: SearchQueryPrams): Promise<GoogleBooksSearch | null> {
    const fetchUrl = `${this.GOOGLE_BOOKS_BASE_URL}volumes?q=${query}`

    try {
      const response = await fetch(fetchUrl)
      return response.json()
    } catch {
      return null
    }
  },

  toUserService(books: GoogleBook[]): UserService[] {
    return books.map(book => ({
      serviceId: book.id,
      serviceName: 'Google Books',
      title: book.volumeInfo.title,
      subTitle: book.volumeInfo.authors?.join(', ') || null,
      previewImage: book.volumeInfo.imageLinks?.smallThumbnail || null,
    }))
  },
}
