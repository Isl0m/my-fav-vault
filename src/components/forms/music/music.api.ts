import { UserMusic } from '@prisma/client'

import {
  DeezerSearchRequest,
  DeezerSearchResponse,
} from '@/schemas/deezer.schema'
import { UserMusicRequest } from '@/schemas/user-music.schema'

export const getMusicOptions = (query: string) => {
  const payload: DeezerSearchRequest = { query }
  return fetch('/api/deezer?' + new URLSearchParams(payload).toString())
}

export const saveSelectedItem = (
  selectedItem: UserMusic | DeezerSearchResponse,
  itemId?: string
) => {
  const payload: UserMusicRequest = { ...selectedItem, id: itemId }

  return fetch('/api/user/music', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
