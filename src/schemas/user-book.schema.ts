import { z } from 'zod'
import { GoogleBookResponseSchema } from '@/schemas/google-books.schema'

export const userBookSchema = GoogleBookResponseSchema.extend({
  id: z.string().optional(),
})

export const userBookRequestSchema = userBookSchema

export type UserBookRequest = z.infer<typeof userBookRequestSchema>


export const userBookResponseSchema = userBookSchema.extend({
  userId: z.string(),
})
