import { getTrackSearch } from '@/lib/search-from-api'
import { DeezerTrackSearch } from '@/schemas/deezer.schema'
import { UserService } from '@/schemas/user-service.schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }

  const tracksResponse: DeezerTrackSearch = await getTrackSearch({
    query,
    limit: 3,
  })

  const tracks: UserService[] = tracksResponse.data.map(track => ({
    serviceId: track.id.toString(),
    title: track.title,
    subTitle: track.artist.name,
    previewImage: track.album.cover_medium,
  }))

  return new Response(JSON.stringify(tracks), { status: 200 })
}
