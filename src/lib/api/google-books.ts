import { SearchQueryPrams } from '.'

import { GoogleBooksSearchSchema } from '@/schemas/google-books.schema'
import { UserService } from '@/schemas/user-service.schema'

export const GOOGLE_BOOKS = {
  serviceName: 'Google Books',
  baseUrl: 'https://www.googleapis.com/books/v1/',

  async getBooks({
    query,
  }: SearchQueryPrams): Promise<UserService[] | undefined> {
    const fetchUrl = `${this.baseUrl}volumes?q=${query}`

    const response = await fetch(fetchUrl)
    const data = await response.json()

    return GoogleBooksSearchSchema.parse(data)
  },
}
