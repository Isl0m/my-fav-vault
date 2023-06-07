import { getMovieSearch, getTmdbImageUrl } from '@/lib/tmdb'
import { TmdbMovieSearch } from '@/schemas/tmdb.schema'
import { UserService } from '@/schemas/user-service.schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  let query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }

  query = new URLSearchParams(query).toString()

  const moviesResponse: TmdbMovieSearch = await getMovieSearch({ query })

  const movies: UserService[] = moviesResponse.results
    .slice(0, 3)
    .map(movie => ({
      serviceId: movie.id.toString(),
      title: movie.title,
      subTitle: movie.release_date,
      previewImage: getTmdbImageUrl(movie.poster_path),
    }))

  return new Response(JSON.stringify(movies || []), { status: 200 })
}
