import { getMovieSearch } from '@/lib/tmdb'
import { TmdbMovieSearch, TmdbSearchResponse } from '@/schemas/tmdb.schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }

  const moviesResponse: TmdbMovieSearch = await getMovieSearch({ query })

  const movies: TmdbSearchResponse[] = moviesResponse.results
    .slice(0, 5)
    .map(movie => ({
      tmdbId: movie.id.toString(),
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
    }))

  return new Response(JSON.stringify(movies || []), { status: 200 })
}
