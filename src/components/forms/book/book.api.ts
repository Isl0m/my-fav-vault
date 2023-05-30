import { UserBook } from '@prisma/client'

import {
  GoogleBookResponse,
  GoogleBooksSearchRequest,
} from '@/schemas/google-books.schema'
import { UserBookRequest } from '@/schemas/user-book.schema'

export const getBookOptions = (query: string) => {
  const payload: GoogleBooksSearchRequest = { query }
  return fetch('/api/google-books?' + new URLSearchParams(payload).toString())
}

export const saveSelectedItem = (
  selectedItem: UserBook | GoogleBookResponse,
  itemId?: string
) => {
  const payload: UserBookRequest = { ...selectedItem, id: itemId }

  return fetch('/api/user/book', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
