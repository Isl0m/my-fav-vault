import { KITSU } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  let query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }

  const limit = 3
  const animesResponse = await KITSU.getAnime({ query, limit })

  if (animesResponse === null || animesResponse.meta.count === 0) {
    return new Response('Anime not found', { status: 404 })
  }

  const animes = KITSU.toUserService(animesResponse.data)

  return new Response(JSON.stringify(animes), { status: 200 })
}
