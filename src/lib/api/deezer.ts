import { SearchQueryPrams } from '.'

import { DeezerTrackSearchSchema } from '@/schemas/deezer.schema'
import { UserService } from '@/schemas/user-service.schema'

export const DEEZER = {
  serviceName: 'Deezer',
  baseUrl: 'https://api.deezer.com/',

  formatLimitParam: (limit?: number) => (limit ? `&limit=${limit}` : ''),

  async getTrack({
    query,
    limit,
  }: SearchQueryPrams): Promise<UserService[] | null> {
    const fetchUrl = `${
      this.baseUrl
    }search/track?q=${query}${this.formatLimitParam(limit)}`

    try {
      const response = await fetch(fetchUrl)
      return DeezerTrackSearchSchema.parse(response.json())
    } catch {
      return null
    }
  },
}
