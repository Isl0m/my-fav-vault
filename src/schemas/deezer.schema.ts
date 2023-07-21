import { z } from 'zod'

import { DEEZER } from '@/lib/api'

const DeezerArtistSchema = z.object({
  name: z.string(),
})

const DeezerAlbumSchema = z.object({
  cover_medium: z.string().url(),
})

export const DeezerTrackSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist: DeezerArtistSchema,
  album: DeezerAlbumSchema,
})

export const DeezerTrackSearchSchema = z
  .object({
    data: z.array(DeezerTrackSchema),
    total: z.number(),
  })
  .transform(result =>
    result.data.map(item => ({
      serviceId: item.id.toString(),
      serviceName: DEEZER.serviceName,
      title: item.title,
      subTitle: item.artist.name,
      previewImage: item.album.cover_medium,
    }))
  )

export type DeezerTrack = z.infer<typeof DeezerTrackSchema>
