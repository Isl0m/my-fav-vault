import { UserMovie } from '@prisma/client'
import { useCallback } from 'react'

import { TmdbSearchRequest, TmdbSearchResponse } from '@/schemas/tmdb.schema'
import { UserMovieRequest } from '@/schemas/user-movie.schema'

export function getMovieOptions(query: string) {
  const payload: TmdbSearchRequest = { query }
  return fetch('/api/tmdb?' + new URLSearchParams(payload).toString())
}

export function saveSelectedItem(
  selectedItem: UserMovie | TmdbSearchResponse,
  itemId?: string
) {
  const payload: UserMovieRequest = { ...selectedItem, id: itemId }

  return fetch('/api/user/movie', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
