import { UserMovie } from '@prisma/client'

import {
  UserService,
  UserServiceSearchRequest,
} from '@/schemas/user-service.schema'

export function getMovieOptions(query: string) {
  const payload: UserServiceSearchRequest = { query }
  return fetch('/api/tmdb?' + new URLSearchParams(payload).toString())
}

export function saveSelectedItem(
  selectedItem: UserMovie | UserService,
  itemId?: string
) {
  const payload: UserService = { ...selectedItem, id: itemId }

  return fetch('/api/user/movie', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
