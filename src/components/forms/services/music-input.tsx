'use client'

import { Music } from '@prisma/client'

import { ServiceInput } from './ServiceInput'
import { getMusicOptions, saveSelectedItem } from './music-api'

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
