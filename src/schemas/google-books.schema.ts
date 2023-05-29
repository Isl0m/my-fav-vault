import { z } from 'zod'

const GoogleBookVolumeInfoSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()).optional(),
  publishedDate: z.string().optional(),
  industryIdentifiers: z.array(
    z.object({ type: z.string(), identifier: z.string() })
  ),
  readingModes: z.object({ text: z.boolean(), image: z.boolean() }),
  pageCount: z.number(),
  printType: z.string(),
  categories: z.array(z.string()),
  maturityRating: z.string(),
  allowAnonLogging: z.boolean(),
  contentVersion: z.string(),
  comicsContent: z.boolean(),
  imageLinks: z
    .object({
      smallThumbnail: z.string(),
      thumbnail: z.string(),
    })
    .optional(),
  language: z.string(),
  previewLink: z.string(),
  infoLink: z.string(),
  canonicalVolumeLink: z.string(),
})

const GoogleBookAccessInfoSchema = z.object({
  country: z.string(),
  viewability: z.string(),
  embeddable: z.boolean(),
  publicDomain: z.boolean(),
  textToSpeechPermission: z.string(),
  epub: z.object({ isAvailable: z.boolean() }),
  pdf: z.object({ isAvailable: z.boolean() }),
  webReaderLink: z.string(),
  accessViewStatus: z.string(),
  quoteSharingAllowed: z.boolean(),
})

const GoogleBookSaleInfoSchema = z.object({
  country: z.string(),
  saleability: z.string(),
  isEbook: z.boolean(),
})

export const GoogleBookSchema = z.object({
  kind: z.string(),
  id: z.string(),
  etag: z.string(),
  selfLink: z.string(),
  volumeInfo: GoogleBookVolumeInfoSchema,
  saleInfo: GoogleBookSaleInfoSchema,
  accessInfo: GoogleBookAccessInfoSchema,
})

export const GoogleBooksSearchSchema = z.object({
  kind: z.string(),
  totalItems: z.number(),
  items: z.array(GoogleBookSchema).optional(),
})

export const GoogleBooksSearchRequestSchema = z.object({
  query: z.string(),
})

export const GoogleBookResponseSchema = z.object({
  googleBooksId: z.string(),
  title: z.string(),
  authors: z.string(),
  thumbnail: z.string().url().nullable(),
  publishedDate: z.string(),
})

export type GoogleBook = z.infer<typeof GoogleBookSchema>
export type GoogleBooksSearch = z.infer<typeof GoogleBooksSearchSchema>
export type GoogleBooksSearchRequest = z.infer<
  typeof GoogleBooksSearchRequestSchema
>
export type GoogleBookResponse = z.infer<typeof GoogleBookResponseSchema>
