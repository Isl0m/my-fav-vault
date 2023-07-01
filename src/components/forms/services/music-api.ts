import { UserMusic } from '@prisma/client'

import {
  UserService,
  UserServiceSearchRequest,
} from '@/schemas/user-service.schema'

export function getMusicOptions(query: string) {
  const payload: UserServiceSearchRequest = { query }
  return fetch('/api/deezer?' + new URLSearchParams(payload).toString())
}

export function saveSelectedItem(
  selectedItem: UserMusic | UserService,
  itemId?: string
) {
  const payload: UserService = { ...selectedItem, id: itemId }

  return fetch('/api/user/music', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
