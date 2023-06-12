import { createClient } from '@supabase/supabase-js'

import { env } from '@/env.mjs'

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

export async function uploadFile(file: File, username: string) {
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(username, file, {
      cacheControl: '3600',
      upsert: true,
    })

  return { data, error }
}

export function getAvatarUrl(imagePath?: string) {
  if (!imagePath) return
  return `${supabaseUrl}/storage/v1/object/public/avatars/${imagePath}`
}