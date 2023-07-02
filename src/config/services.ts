import { DEEZER, GOOGLE_BOOKS, KITSU, TMDB } from '@/lib/api'

export const servicesConfig = {
  anime: KITSU.serviceName,
  movie: TMDB.serviceName,
  music: DEEZER.serviceName,
  book: GOOGLE_BOOKS.serviceName,
  manga: KITSU.serviceName,
}
