'use client'

import { useState } from 'react'

import { UserMovie } from '@prisma/client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import { servicesConfig } from '@/config/services'

import { ServiceInput } from './ServiceInput'
import { getAnimeOptions, getMovieOptions, saveSelectedItem } from './movie-api'

type Props = {
  name?: string
  userMovie?: UserMovie
}

export function MovieInput({ name, userMovie }: Props) {
  const [isAnime, setIsAnime] = useState(
    servicesConfig.anime === userMovie?.serviceName || false
  )
  const handleSwitch = () => setIsAnime(prev => !prev)
  return (
    <div className='relative'>
      <ServiceInput<UserMovie>
        name={name}
        userService={userMovie}
        getInputOptions={isAnime ? getAnimeOptions : getMovieOptions}
        saveSelectedItem={saveSelectedItem}
      />
      <div className='absolute right-0 top-0 flex items-center gap-2'>
        <Checkbox
          id='movie-type'
          checked={isAnime}
          onCheckedChange={handleSwitch}
        />
        <Label className='text-xs font-normal' htmlFor='movie-type'>
          Anime
        </Label>
      </div>
    </div>
  )
}
