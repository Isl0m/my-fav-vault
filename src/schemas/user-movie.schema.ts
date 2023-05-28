import { z } from 'zod'

export const userMovieSchema = z.object({
  id: z.string().optional(),
  tmdbId: z.string(),
  title: z.string(),
  posterPath: z.string().nullable(),
  releaseDate: z.string().nullable(),
})

export const userMovieRequestSchema = userMovieSchema

export type UserMovieRequest = z.infer<typeof userMovieRequestSchema>

export const userMovieResponseSchema = userMovieSchema.extend({
  userId: z.string(),
})

export type userMovieResponse = z.infer<typeof userMovieRequestSchema>
