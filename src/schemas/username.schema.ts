import { z } from 'zod'

export const usernameUpdateRequestSchema = z.object({
  email: z.string(),
  username: z.string(),
})

export type UsernameUpdateRequest = z.infer<typeof usernameUpdateRequestSchema>
