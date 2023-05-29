import { z } from 'zod'
import { TmdbSearchResponseSchema } from '@/schemas/tmdb.schema'

export const userMovieSchema = TmdbSearchResponseSchema.extend({
  id: z.string().optional(),
})

export const userMovieRequestSchema = userMovieSchema

export type UserMovieRequest = z.infer<typeof userMovieRequestSchema>

export const userMovieResponseSchema = userMovieSchema.extend({
  userId: z.string(),
})

export type userMovieResponse = z.infer<typeof userMovieRequestSchema>
