import { env } from '@/env.mjs'
import {
  TmdbMovie,
  TmdbMovieSearch,
  tmdbMovieErrorSchema,
} from '@/schemas/tmdb.schema'
import { UserService } from '@/schemas/user-service.schema'

export const TMDB = {
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/original',

  getImageUrl(imagePath?: string | null) {
    return imagePath ? this.TMDB_IMAGE_BASE_URL + imagePath : null
  },

  async getMovie({
    query,
  }: {
    query: string
  }): Promise<TmdbMovieSearch | null> {
    const fetchUrl = `${this.TMDB_BASE_URL}/search/movie?api_key=${env.TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`

    try {
      const response = await (await fetch(fetchUrl)).json()

      if (tmdbMovieErrorSchema.safeParse(response).success) {
        return null
      }

      return response
    } catch  {
      return null
    }
  },

  toUserService(movies: TmdbMovie[]): UserService[] {
    return movies.map(movie => ({
      serviceId: movie.id.toString(),
      serviceName: 'TMDB',
      title: movie.title,
      subTitle: movie.release_date,
      previewImage: this.getImageUrl(movie.poster_path),
    }))
  },
}