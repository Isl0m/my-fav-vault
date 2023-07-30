'use client'

import { toast } from 'react-hot-toast'

import { Button } from '@ui/button'

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

export const ShareProfileButton = ({ username }: { username: string }) => {
  const handleClick = async () => {
    const isSuccess = await copyProfileUrl(username)
    isSuccess && toast.success('Copied to clipboard')
  }
  return <Button onClick={handleClick}>Share Profile</Button>
}
