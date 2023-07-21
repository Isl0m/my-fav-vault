import { z } from 'zod'

import { KITSU } from '@/lib/api'

export const KitsuSchema = z.object({
  id: z.string(),
  attributes: z.object({
    titles: z.object({
      en: z.string().nullable(),
      en_jp: z.string().nullable(),
      ja_jp: z.string().nullable(),
    }),
    canonicalTitle: z.string(),
    startDate: z.string(),
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
  }),
})

export const KitsuSearchSchema = z
  .object({
    data: z.array(KitsuSchema),
    meta: z.object({ count: z.number() }),
  })
  .transform(result =>
    result.data.map(item => ({
      serviceId: item.id.toString(),
      serviceName: KITSU.serviceName,
      title: item.attributes.canonicalTitle,
      subTitle: item.attributes.startDate,
      previewImage: item.attributes.posterImage.original,
    }))
  )

export type Kitsu = z.infer<typeof KitsuSchema>
