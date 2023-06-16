import { SearchQueryPrams } from '.'

import { KitsuAnime, KitsuManga } from '@/schemas/kitsu.schema'
import { UserService } from '@/schemas/user-service.schema'

export const KITSU = {
  KITSU_BASE_URL: 'https://kitsu.io/api/edge',
  formatLimitParam: (limit?: number) => (limit ? `&page[limit]=${limit}` : ''),

  async getAnime({ query, limit }: SearchQueryPrams) {
    const fetchUrl = `${
      this.KITSU_BASE_URL
    }/anime?filter[text]=${query}${this.formatLimitParam(limit)}`
    console.log(fetchUrl)
    const response = await fetch(fetchUrl)

    return response.json()
  },

  async getManga({ query, limit }: SearchQueryPrams) {
    const fetchUrl = `${
      this.KITSU_BASE_URL
    }/manga?filter[text]=${query}${this.formatLimitParam(limit)}`

    const response = await fetch(fetchUrl)

    return response.json()
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
