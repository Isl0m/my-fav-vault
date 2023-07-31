import { z } from 'zod'

import { KITSU } from '@/lib/api'

export const KitsuSchema = z.object({
  id: z.string(),
  attributes: z.object({
    titles: z.object({
      en: z.string().nullable().optional(),
      en_jp: z.string().nullable().optional(),
      ja_jp: z.string().nullable().optional(),
    }),
    canonicalTitle: z.string(),
    startDate: z.string(),
    posterImage: z.object({
      tiny: z.string().optional(),
      large: z.string().optional(),
      small: z.string().optional(),
      medium: z.string().optional(),
      original: z.string(),
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
