import { SearchQueryPrams } from '.'

import {
  KitsuAnime,
  KitsuAnimeSearch,
  KitsuManga,
  KitsuMangaSearch,
} from '@/schemas/kitsu.schema'
import { UserService } from '@/schemas/user-service.schema'

export const KITSU = {
  serviceName: 'Kitsu',
  baseUrl: 'https://kitsu.io/api/edge',
  formatLimitParam: (limit?: number) => (limit ? `&page[limit]=${limit}` : ''),

  async getAnime({
    query,
    limit,
  }: SearchQueryPrams): Promise<KitsuAnimeSearch | null> {
    const fetchUrl = `${
      this.baseUrl
    }/anime?filter[text]=${query}${this.formatLimitParam(limit)}`
    try {
      const response = await fetch(fetchUrl)
      return response.json()
    } catch {
      return null
    }
  },

  async getManga({
    query,
    limit,
  }: SearchQueryPrams): Promise<KitsuMangaSearch | null> {
    const fetchUrl = `${
      this.baseUrl
    }/manga?filter[text]=${query}${this.formatLimitParam(limit)}`

    try {
      const response = await fetch(fetchUrl)
      return response.json()
    } catch {
      return null
    }
  },

  toUserService(items: Array<KitsuAnime | KitsuManga>): UserService[] {
    return items.map(item => ({
      serviceId: item.id.toString(),
      serviceName: this.serviceName,
      title:
        item.attributes.titles.en ||
        item.attributes.titles.en_jp ||
        item.attributes.titles.ja_jp ||
        item.attributes.canonicalTitle,
      subTitle: item.attributes.startDate,
      previewImage: item.attributes.posterImage.original,
    }))
  },
}
