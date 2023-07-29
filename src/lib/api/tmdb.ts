import { env } from '@/env.mjs'
import { tmdbMovieSearchSchema } from '@/schemas/tmdb.schema'
import { UserService } from '@/schemas/user-service.schema'

export const TMDB = {
  serviceName: 'TMDB',
  baseUrl: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p/original',

  getImageUrl(imageSrc?: string | null) {
    return imageSrc ? this.imageBaseUrl + imageSrc : null
  },

  async getMovie({
    query,
  }: {
    query: string
  }): Promise<UserService[] | undefined> {
    const fetchUrl = `${this.baseUrl}/search/movie?api_key=${env.TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    const response = await fetch(fetchUrl)
    const data = await response.json()

    return tmdbMovieSearchSchema.parse(data)
  },
}
