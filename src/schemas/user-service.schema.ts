import { z } from 'zod'

export const userServiceSchema = z.object({
  serviceId: z.string(),
  title: z.string(),
  subTitle: z.string().nullable(),
  previewImage: z.string().nullable(),
  id: z.string().optional(),
})

export const userServiceSearchRequestSchema = z.object({
  query: z.string(),
})

export type UserService = z.infer<typeof userServiceSchema>
export type UserServiceSearchRequest = z.infer<
  typeof userServiceSearchRequestSchema
>
