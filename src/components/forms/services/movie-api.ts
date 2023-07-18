import { Movie } from '@prisma/client'

import {
  UserService,
  UserServiceSearchRequest,
} from '@/schemas/user-service.schema'

export function getMovieOptions(query: string) {
  const payload: UserServiceSearchRequest = { query }
  return fetch('/api/movie?' + new URLSearchParams(payload).toString())
}

export function getAnimeOptions(query: string) {
  const payload: UserServiceSearchRequest = { query }
  return fetch('/api/anime?' + new URLSearchParams(payload).toString())
}

export function saveSelectedItem(
  selectedItem: Movie | UserService,
  itemId?: string
) {
  const payload: UserService = { ...selectedItem, id: itemId }

  return fetch('/api/user/movie', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
