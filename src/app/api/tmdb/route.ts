import { getMovieSearch, getTmdbImageUrl } from '@/lib/tmdb'
import { TmdbMovieSearch, TmdbSearchResponse } from '@/schemas/tmdb.schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  let query = searchParams.get('query')

  if (!query) {
    searchParams
    return new Response('No query param', { status: 400 })
  }

  query = new URLSearchParams(query).toString()

  const moviesResponse: TmdbMovieSearch = await getMovieSearch({ query })

  const movies: TmdbSearchResponse[] = moviesResponse.results
    .slice(0, 3)
    .map(movie => ({
      tmdbId: movie.id.toString(),
      title: movie.title,
      posterPath: getTmdbImageUrl(movie.poster_path),
      releaseDate: movie.release_date,
    }))

  return new Response(JSON.stringify(movies || []), { status: 200 })
}
