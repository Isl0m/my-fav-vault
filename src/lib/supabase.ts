import { createClient } from '@supabase/supabase-js'

import { env } from '@/env.mjs'

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_KEY
const appEnv = env.NEXT_PUBLIC_APP_ENV

type GetAvatarUrl = { username: string; fileBaseName: string }

export const SUPABASE = {
  client: createClient(supabaseUrl, supabaseKey),

  createAvatarUrl({ username, fileBaseName }: GetAvatarUrl) {
    return `${appEnv}/${username}/${fileBaseName}_${Date.now().toString()}`
  },
  async uploadFile(file: File, username: string) {
    return await this.client.storage
      .from('avatars')
      .upload(
        this.createAvatarUrl({ username, fileBaseName: file.name }),
        file,
        {
          cacheControl: '3600',
          upsert: true,
        }
      )
  },
  async deleteFiles(filePaths: string[]) {
    return await this.client.storage.from('avatars').remove(filePaths)
  },
  async listOfFiles(folder: string) {
    return await this.client.storage
      .from('avatars')
      .list(folder, { sortBy: { column: 'created_at', order: 'desc' } })
  },

  async deleteUnusedFile(username: string) {
    try {
      const { data } = await this.listOfFiles(username)
      if (!data?.[0] || (data && data.length < 2)) return

      const filesToRemove = data.slice(1)
      filesToRemove.forEach(async file => {
        await this.deleteFiles([`${username}/${file.name}`])
      })
      return
    } catch (e) {
      console.error(e)
    }
  },
  getAvatarUrl(imageSrc: string) {
    return `${supabaseUrl}/storage/v1/object/public/avatars/${imageSrc}`
  },
}
