import { z } from 'zod'

export const bookSchema = z.object({
  serviceId: z.string(),
  title: z.string(),
  subTitle: z.string().nullable(),
  previewImage: z.string().nullable(),
})

export const bookRequestSchema = bookSchema.extend({
  id: z.string().optional(),
})

export const bookSearchRequestSchema = z.object({
  query: z.string(),
})

export type Book = z.infer<typeof bookSchema>
export type BookRequest = z.infer<typeof bookRequestSchema>
export type BookSearchRequest = z.infer<typeof bookSearchRequestSchema>
