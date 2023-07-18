'use client'

import { env } from '@/env.mjs'

export default async function copyProfileUrl(username: string) {
  const text = `${env.NEXT_PUBLIC_APP_URL}@${username}`
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.warn('Copy failed', error)
    return false
  }
}
