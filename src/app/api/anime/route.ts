import { KITSU } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  let query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }

  const limit = 3
  const animes = await KITSU.getAnime({ query, limit })

  if (!animes?.length) {
    return new Response('Anime not found', { status: 404 })
  }

  return new Response(JSON.stringify(animes), { status: 200 })
}
