'use client'

import { Music } from '@prisma/client'

import { getMusicOptions, saveSelectedItem } from './music-api'
import { ServiceInput } from './service-input'

type Props = {
  name?: string
  music?: Music
}

export function MusicInput({ name, music }: Props) {
  return (
    <ServiceInput<Music>
      name={name}
      userService={music}
      getInputOptions={getMusicOptions}
      saveSelectedItem={saveSelectedItem}
    />
  )
}
