import { SearchQueryPrams } from '.'

import { KitsuSearchSchema } from '@/schemas/kitsu.schema'
import { UserService } from '@/schemas/user-service.schema'

export const KITSU = {
  serviceName: 'Kitsu',
  baseUrl: 'https://kitsu.io/api/edge',
  formatLimitParam: (limit?: number) => (limit ? `&page[limit]=${limit}` : ''),

  async getAnime({
    query,
    limit,
  }: SearchQueryPrams): Promise<UserService[] | null> {
    const fetchUrl = `${
      this.baseUrl
    }/anime?filter[text]=${query}${this.formatLimitParam(limit)}`
    try {
      const response = await fetch(fetchUrl)
      return KitsuSearchSchema.parse(response.json())
    } catch {
      return null
    }
  },

  async getManga({
    query,
    limit,
  }: SearchQueryPrams): Promise<UserService[] | null> {
    const fetchUrl = `${
      this.baseUrl
    }/manga?filter[text]=${query}${this.formatLimitParam(limit)}`

    try {
      const response = await fetch(fetchUrl)
      return KitsuSearchSchema.parse(response.json())
    } catch {
      return null
    }
  },
}
