import { z } from 'zod'

export const imageUpdateRequestSchema = z.object({
  username: z.string(),
  image: z.string(),
  prevImage: z.string().optional()
})

export type ImageUpdateRequest = z.infer<typeof imageUpdateRequestSchema>
