import { SearchQueryPrams } from '.'

import { DeezerTrack, DeezerTrackSearch } from '@/schemas/deezer.schema'
import { UserService } from '@/schemas/user-service.schema'

export const DEEZER = {
  serviceName: 'Deezer',
  baseUrl: 'https://api.deezer.com/',

  formatLimitParam: (limit?: number) => (limit ? `&limit=${limit}` : ''),

  async getTrack({
    query,
    limit,
  }: SearchQueryPrams): Promise<DeezerTrackSearch | null> {
    const fetchUrl = `${
      this.baseUrl
    }search/track?q=${query}${this.formatLimitParam(limit)}`

    try {
      const response = await fetch(fetchUrl)
      return response.json()
    } catch {
      return null
    }
  },

  toUserService(tracks: DeezerTrack[]): UserService[] {
    return tracks.map(track => ({
      serviceId: track.id.toString(),
      serviceName: this.serviceName,
      title: track.title,
      subTitle: track.artist.name,
      previewImage: track.album.cover_medium,
    }))
  },
}
