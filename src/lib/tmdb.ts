import { env } from '@/env.mjs'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'

export function getTmdbImageUrl(imagePath?: string | null) {
  return imagePath ? TMDB_IMAGE_BASE_URL + imagePath : null
}

export async function getMovieSearch({ query }: { query: string }) {
  const fetchUrl = `${TMDB_BASE_URL}/search/movie?api_key=${env.TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`

  const response = await fetch(fetchUrl)
  return response.json()
}
