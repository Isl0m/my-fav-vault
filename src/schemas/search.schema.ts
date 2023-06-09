import { z } from 'zod'

export const searchRequestSchema = z.object({
  query: z.string(),
})

export type SearchRequest = z.infer<typeof searchRequestSchema>
