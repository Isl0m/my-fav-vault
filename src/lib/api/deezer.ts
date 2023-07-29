import { SearchQueryPrams } from '.'

import { DeezerTrackSearchSchema } from '@/schemas/deezer.schema'
import { UserService } from '@/schemas/user-service.schema'

export const DEEZER = {
  serviceName: 'Deezer',
  baseUrl: 'https://api.deezer.com/',

  formatLimitParam: (limit?: number) => (limit ? `&limit=${limit}` : ''),

  async getTrack({ query, limit }: SearchQueryPrams): Promise<UserService[]> {
    const fetchUrl = `${
      this.baseUrl
    }search/track?q=${query}${this.formatLimitParam(limit)}`

    const response = await fetch(fetchUrl)
    const data = await response.json()

    return DeezerTrackSearchSchema.parse(data)
  },
}
