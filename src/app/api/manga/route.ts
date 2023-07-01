import { KITSU } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }
  const limit = 3

  const mangasResponse = await KITSU.getManga({ query, limit })

  if (mangasResponse === null || mangasResponse.meta.count === 0) {
    return new Response('Book not found', { status: 404 })
  }

  const mangas = KITSU.toUserService(mangasResponse.data)

  return new Response(JSON.stringify(mangas), { status: 200 })
}
