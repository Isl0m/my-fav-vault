import { z } from 'zod'

import { DeezerSearchResponseSchema } from '@/schemas/deezer.schema'

export const userMusicSchema = DeezerSearchResponseSchema.extend({
  id: z.string().optional(),
})

export const userMusicRequestSchema = userMusicSchema

export type UserMusicRequest = z.infer<typeof userMusicRequestSchema>

export const userMusicResponseSchema = userMusicSchema.extend({
  userId: z.string(),
})
