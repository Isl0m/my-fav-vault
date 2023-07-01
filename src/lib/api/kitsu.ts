import { SearchQueryPrams } from '.'

import {
  KitsuAnime,
  KitsuAnimeSearch,
  KitsuManga,
  KitsuMangaSearch,
} from '@/schemas/kitsu.schema'
import { UserService } from '@/schemas/user-service.schema'

export const KITSU = {
  KITSU_BASE_URL: 'https://kitsu.io/api/edge',
  formatLimitParam: (limit?: number) => (limit ? `&page[limit]=${limit}` : ''),

  async getAnime({
    query,
    limit,
  }: SearchQueryPrams): Promise<KitsuAnimeSearch | null> {
    const fetchUrl = `${
      this.KITSU_BASE_URL
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
      this.KITSU_BASE_URL
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
      serviceName: 'Kitsu',
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
