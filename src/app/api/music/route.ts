import { z } from 'zod'

import { DEEZER } from '@/lib/api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return new Response('No query param', { status: 400 })
  }

  try {
    const tracks = await DEEZER.getTrack({
      query,
      limit: 3,
    })

    if (!tracks?.length) {
      return new Response('Music not found', { status: 404 })
    }

    return new Response(JSON.stringify(tracks), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 404 })
    }
    return new Response(null, { status: 404 })
  }
}
