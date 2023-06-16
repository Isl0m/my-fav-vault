import { z } from 'zod'

export const KitsuBaseSchema = z.object({
  id: z.string(),
  type: z.string(),
  links: z.object({ self: z.string() }),
  attributes: z.object({
    createdAt: z.string(),
    updatedAt: z.string(),
    slug: z.string(),
    synopsis: z.string(),
    description: z.string(),
    coverImageTopOffset: z.number(),
    titles: z.object({
      en: z.string().nullable(),
      en_jp: z.string().nullable(),
      ja_jp: z.string().nullable(),
    }),
    canonicalTitle: z.string(),
    abbreviatedTitles: z.array(z.string().nullable()),
    averageRating: z.string(),
    ratingFrequencies: z.object({
      2: z.string(),
      3: z.string(),
      4: z.string(),
      5: z.string(),
      6: z.string(),
      7: z.string(),
      8: z.string(),
      9: z.string(),
      10: z.string(),
      11: z.string(),
      12: z.string(),
      13: z.string(),
      14: z.string(),
      15: z.string(),
      16: z.string(),
      17: z.string(),
      18: z.string(),
      19: z.string(),
      20: z.string(),
    }),
    userCount: z.number(),
    favoritesCount: z.number(),
    startDate: z.string(),
    endDate: z.string().nullable(),
    nextRelease: z.string(),
    popularityRank: z.number(),
    ratingRank: z.number(),
    ageRating: z.string(),
    ageRatingGuide: z.string(),
    subtype: z.string(),
    status: z.string(),
    tba: z.null(),
    posterImage: z.object({
      tiny: z.string(),
      large: z.string(),
      small: z.string(),
      medium: z.string(),
      original: z.string(),
      meta: z.object({
        dimensions: z.object({
          tiny: z.object({ width: z.number(), height: z.number() }),
          large: z.object({ width: z.number(), height: z.number() }),
          small: z.object({ width: z.number(), height: z.number() }),
          medium: z.object({ width: z.number(), height: z.number() }),
        }),
      }),
    }),
    coverImage: z
      .object({
        tiny: z.string(),
        large: z.string(),
        small: z.string(),
        original: z.string(),
        meta: z.object({
          dimensions: z.object({
            tiny: z.object({ width: z.number(), height: z.number() }),
            large: z.object({ width: z.number(), height: z.number() }),
            small: z.object({ width: z.number(), height: z.number() }),
          }),
        }),
      })
      .nullable(),
  }),
  relationships: z.unknown(),
})

const KitsuAnimeSchema = KitsuBaseSchema.extend({
  episodeCount: z.null(),
  episodeLength: z.number(),
  totalLength: z.number(),
  youtubeVideoId: z.string(),
  showType: z.string(),
  nsfw: z.boolean(),
})

const KitsuMangaSchema = KitsuBaseSchema.extend({
  chapterCount: z.number(),
  volumeCount: z.number(),
  serialization: z.string(),
  mangaType: z.string(),
})

export const KitsuAnimeSearchSchema = z.object({
  data: z.array(KitsuAnimeSchema),
  meta: z.object({ count: z.number() }),
  links: z.object({ first: z.string(), next: z.string(), last: z.string() }),
})

export const KitsuMangaSearchSchema = z.object({
  data: z.array(KitsuMangaSchema),
  meta: z.object({ count: z.number() }),
  links: z.object({ first: z.string(), next: z.string(), last: z.string() }),
})

export type KitsuAnime = z.infer<typeof KitsuAnimeSchema>
export type KitsuAnimeSearch = z.infer<typeof KitsuAnimeSearchSchema>

export type KitsuManga = z.infer<typeof KitsuMangaSchema>
export type KitsuMangaSearch = z.infer<typeof KitsuMangaSearchSchema>
