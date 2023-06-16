import { SearchQueryPrams } from '.'

import { DeezerTrack } from '@/schemas/deezer.schema'
import { UserService } from '@/schemas/user-service.schema'

export const DEEZER = {
  DEEZER_BASE_URL: 'https://api.deezer.com/',

  formatLimitParam: (limit?: number) => (limit ? `&limit=${limit}` : ''),

  async getTrack({ query, limit }: SearchQueryPrams) {
    const fetchUrl = `${
      this.DEEZER_BASE_URL
    }search/track?q=${query}${this.formatLimitParam(limit)}`

    const response = await fetch(fetchUrl)
    return response.json()
  },

  toUserService(tracks: DeezerTrack[]): UserService[] {
    return tracks.map(track => ({
      serviceId: track.id.toString(),
      serviceName: 'DEEZER',
      title: track.title,
      subTitle: track.artist.name,
      previewImage: track.album.cover_medium,
    }))
  },
}
