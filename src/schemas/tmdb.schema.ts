import { z } from 'zod'

import { TMDB } from '@/lib/api'

const tmdbMovieSchema = z.object({
  id: z.number(),
  poster_path: z.string(),
  release_date: z.string(),
  title: z.string(),
})

export const tmdbMovieErrorSchema = z.object({
  status_code: z.number(),
  status_message: z.string(),
  success: z.boolean(),
})

export const tmdbMovieSearchSchema = z
  .object({
    results: z.array(tmdbMovieSchema).optional(),
    total_results: z.number().optional(),
  })
  .transform(data =>
    data.results?.map(item => ({
      serviceId: item.id.toString(),
      serviceName: TMDB.serviceName,
      title: item.title,
      subTitle: item.release_date,
      previewImage: TMDB.getImageUrl(item.poster_path),
    }))
  )

export type TmdbMovie = z.infer<typeof tmdbMovieSchema>
export type TmdbMovieError = z.infer<typeof tmdbMovieErrorSchema>
