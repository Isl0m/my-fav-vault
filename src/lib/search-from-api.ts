type SearchQueryPrams = {
  query: string
  limit?: number
}

const formatLimitParam = (limit?: number) => (limit ? `&limit=${limit}` : '')

export const DEEZER_BASE_URL = 'https://api.deezer.com/'

export const GOOGLE_BOOKS_BASE_URL = 'https://www.googleapis.com/books/v1/'

export async function getTrackSearch({ query, limit }: SearchQueryPrams) {
  const fetchUrl = `${DEEZER_BASE_URL}search/track?q=${query}${formatLimitParam(
    limit
  )}`

  const response = await fetch(fetchUrl)
  return response.json()
}

export async function getBooksSearch({ query, limit }: SearchQueryPrams) {
  const fetchUrl = `${GOOGLE_BOOKS_BASE_URL}volumes?q=${query}${formatLimitParam(
    limit
  )}`

  const response = await fetch(fetchUrl)
  return response.json()
}
