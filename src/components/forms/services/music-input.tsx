'use client'

import { UserMusic } from '@prisma/client'

import { ServiceInput } from './ServiceInput'
import { getMusicOptions, saveSelectedItem } from './music-api'

type Props = {
  name?: string
  userMusic?: UserMusic
}

export function MusicInput({ name, userMusic }: Props) {
  return (
    <ServiceInput<UserMusic>
      name={name}
      userService={userMusic}
      getInputOptions={getMusicOptions}
      saveSelectedItem={saveSelectedItem}
    />
  )
}
