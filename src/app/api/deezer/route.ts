import { DEEZER } from '@/lib/api'
import { DeezerTrackSearch } from '@/schemas/deezer.schema'
import { UserService } from '@/schemas/user-service.schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }

  const tracksResponse: DeezerTrackSearch = await DEEZER.getTrack({
    query,
    limit: 3,
  })

  const tracks: UserService[] = DEEZER.toUserService(tracksResponse.data)

  return new Response(JSON.stringify(tracks), { status: 200 })
}
