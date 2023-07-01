import { TMDB } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  let query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }

  const limit = 3
  const moviesResponse = await TMDB.getMovie({ query })

  if (moviesResponse === null || moviesResponse.total_results === 0) {
    return new Response('Movie not found', { status: 404 })
  }

  const movies = TMDB.toUserService(moviesResponse.results.slice(0, limit))

  return new Response(JSON.stringify(movies), { status: 200 })
}
