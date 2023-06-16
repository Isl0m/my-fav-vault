import { KITSU } from '@/lib/api'
import { TMDB } from '@/lib/api'
import { KitsuAnimeSearch } from '@/schemas/kitsu.schema'
import { TmdbMovieSearch } from '@/schemas/tmdb.schema'
import { UserService } from '@/schemas/user-service.schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  let query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }

  const limit = 3

  const moviesResponse: [TmdbMovieSearch, KitsuAnimeSearch] = await Promise.all(
    [TMDB.getMovie({ query }), KITSU.getAnime({ query, limit })]
  )

  let movies: UserService[]

  const tmdbResultCount = moviesResponse[0].total_results
  const kitsuResultCount = moviesResponse[1].meta.count

  if (tmdbResultCount > 0 && kitsuResultCount > 0) {
    const animeCount = tmdbResultCount >= 2 ? 1 : 2
    movies = [
      ...TMDB.toUserService(
        moviesResponse[0].results.slice(0, limit - animeCount)
      ),
      ...KITSU.toUserService(moviesResponse[1].data.slice(0, animeCount)),
    ]
  } else if (tmdbResultCount === 0) {
    movies = KITSU.toUserService(moviesResponse[1].data)
  } else {
    movies = TMDB.toUserService(moviesResponse[0].results.slice(0, limit))
  }

  return new Response(JSON.stringify(movies || []), { status: 200 })
}
