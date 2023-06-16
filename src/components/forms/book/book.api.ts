import { UserBook } from '@prisma/client'

import {
  UserService,
  UserServiceSearchRequest,
} from '@/schemas/user-service.schema'

export function getBookOptions(query: string) {
  const payload: UserServiceSearchRequest = { query }
  return fetch('/api/book?' + new URLSearchParams(payload).toString())
}

export function saveSelectedItem(
  selectedItem: UserBook | UserService,
  itemId?: string
) {
  const payload: UserService = { ...selectedItem, id: itemId }

  return fetch('/api/user/book', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
