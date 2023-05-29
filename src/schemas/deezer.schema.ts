import { z } from 'zod'

const DeezerArtistSchema = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string().url(),
  picture: z.string().url(),
  picture_small: z.string().url(),
  picture_medium: z.string().url(),
  picture_big: z.string().url(),
  picture_xl: z.string().url(),
  tracklist: z.string().url(),
})

const DeezerAlbumSchema = z.object({
  id: z.number(),
  title: z.string(),
  cover: z.string().url(),
  cover_small: z.string().url(),
  cover_medium: z.string().url(),
  cover_big: z.string().url(),
  cover_xl: z.string().url(),
  tracklist: z.string().url(),
})

export const DeezerTrackSchema = z.object({
  id: z.number(),
  readable: z.boolean(),
  title: z.string(),
  title_short: z.string(),
  title_version: z.string(),
  link: z.string().url(),
  duration: z.number(),
  rank: z.number(),
  explicit_lyrics: z.boolean(),
  preview: z.string().url(),
  artist: DeezerArtistSchema,
  album: DeezerAlbumSchema,
})

export const DeezerTrackSearchSchema = z.object({
  data: z.array(DeezerTrackSchema),
  total: z.number(),
  next: z.string().url(),
})

export const DeezerSearchRequestSchema = z.object({
  query: z.string(),
})

export const DeezerSearchResponseSchema = z.object({
  deezerId: z.string(),
  title: z.string(),
  artist: z.string(),
  cover: z.string().url(),
})

export type DeezerTrack = z.infer<typeof DeezerTrackSchema>
export type DeezerTrackSearch = z.infer<typeof DeezerTrackSearchSchema>
export type DeezerSearchRequest = z.infer<typeof DeezerSearchRequestSchema>
export type DeezerSearchResponse = z.infer<typeof DeezerSearchResponseSchema>
