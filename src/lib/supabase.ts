import { createClient } from '@supabase/supabase-js'

import { env } from '@/env.mjs'

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

export async function uploadFile(file: File, username: string) {
  return await supabase.storage
    .from('avatars')
    .upload(`${username}/${file.name}_${Date.now()}`.toString(), file, {
      cacheControl: '3600',
      upsert: true,
    })
}

export async function deleteFiles(filePaths: string[]){
  return await supabase
    .storage
    .from('avatars')
    .remove(filePaths)
}

export async function listOfFiles(folder:string){
  return  await supabase
    .storage
    .from('avatars')
    .list(folder, {
      limit: 1,
    })
  }


export function getAvatarUrl(imagePath?: string) {
  if (!imagePath) return
  return `${supabaseUrl}/storage/v1/object/public/avatars/${imagePath}`
}