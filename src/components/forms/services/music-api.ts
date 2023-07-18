import { Music } from '@prisma/client'

import {
  UserService,
  UserServiceSearchRequest,
} from '@/schemas/user-service.schema'

export function getMusicOptions(query: string) {
  const payload: UserServiceSearchRequest = { query }
  return fetch('/api/music?' + new URLSearchParams(payload).toString())
}

export function saveSelectedItem(
  selectedItem: Music | UserService,
  itemId?: string
) {
  const payload: UserService = { ...selectedItem, id: itemId }

  return fetch('/api/user/music', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
