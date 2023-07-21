import { DEEZER } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }

  const tracks = await DEEZER.getTrack({
    query,
    limit: 3,
  })

  if (!tracks?.length) {
    return new Response('Book not found', { status: 404 })
  }

  return new Response(JSON.stringify(tracks), { status: 200 })
}
