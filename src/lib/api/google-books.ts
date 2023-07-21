import { SearchQueryPrams } from '.'

import { GoogleBooksSearchSchema } from '@/schemas/google-books.schema'
import { UserService } from '@/schemas/user-service.schema'

export const GOOGLE_BOOKS = {
  serviceName: 'Google Books',
  baseUrl: 'https://www.googleapis.com/books/v1/',

  async getBooks({ query }: SearchQueryPrams): Promise<UserService[] | null> {
    const fetchUrl = `${this.baseUrl}volumes?q=${query}`

    try {
      const response = await fetch(fetchUrl)
      return GoogleBooksSearchSchema.parse(response.json())
    } catch {
      return null
    }
  },
}
