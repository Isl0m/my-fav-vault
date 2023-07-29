import { z } from 'zod'

import { GOOGLE_BOOKS } from '@/lib/api'

const GoogleBookVolumeInfoSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()).optional(),
  imageLinks: z
    .object({
      smallThumbnail: z.string(),
      thumbnail: z.string(),
    })
    .optional(),
})

export const GoogleBookSchema = z.object({
  id: z.string(),
  volumeInfo: GoogleBookVolumeInfoSchema,
})

export const GoogleBooksSearchSchema = z
  .object({
    totalItems: z.number(),
    items: z.array(GoogleBookSchema).optional(),
  })
  .transform(result =>
    result.items?.map(item => ({
      serviceId: item.id,
      serviceName: GOOGLE_BOOKS.serviceName,
      title: item.volumeInfo.title,
      subTitle: item.volumeInfo.authors?.join(', ') || null,
      previewImage: item.volumeInfo.imageLinks?.smallThumbnail || null,
    }))
  )

export type GoogleBook = z.infer<typeof GoogleBookSchema>
