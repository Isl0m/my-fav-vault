'use client'

import { UserMovie } from '@prisma/client'

import { ServiceInput } from '@/components/forms/ServiceInput'

import { getMovieOptions, saveSelectedItem } from './movie.api'

type Props = {
  name?: string
  userMovie?: UserMovie
}

export function MovieInput({ name, userMovie }: Props) {
  return (
    <ServiceInput<UserMovie>
      name={name}
      userService={userMovie}
      getInputOptions={getMovieOptions}
      saveSelectedItem={saveSelectedItem}
    />
  )
}
