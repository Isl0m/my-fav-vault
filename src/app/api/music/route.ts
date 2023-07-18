import { DEEZER } from '@/lib/api'
import { UserService } from '@/schemas/user-service.schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }

  const tracksResponse = await DEEZER.getTrack({
    query,
    limit: 3,
  })
  
  if(tracksResponse === null || tracksResponse.total === 0){
      return new Response('Book not found', { status: 404 })
  }

  const tracks: UserService[] = DEEZER.toUserService(tracksResponse.data)

  return new Response(JSON.stringify(tracks), { status: 200 })
}
