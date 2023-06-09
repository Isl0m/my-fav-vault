import { z } from 'zod'

export const UserOptionSchema = z.object({
  username: z.string(),
  email: z.string(),
  image: z.string().nullable(),
})

export type UserOption = z.infer<typeof UserOptionSchema>
