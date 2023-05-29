import { getTrackSearch } from '@/lib/search-from-api'
import {
  DeezerSearchResponse,
  DeezerTrackSearch,
} from '@/schemas/deezer.schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }

  const tracksResponse: DeezerTrackSearch = await getTrackSearch({
    query,
    limit: 5,
  })

  const tracks: DeezerSearchResponse[] = tracksResponse.data.map(track => ({
    deezerId: track.id.toString(),
    title: track.title,
    artist: track.artist.name,
    cover: track.album.cover_medium,
  }))

  return new Response(JSON.stringify(tracks), { status: 200 })
}
