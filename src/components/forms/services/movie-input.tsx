'use client'

import { useId, useState } from 'react'

import { Movie } from '@prisma/client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { servicesConfig } from '@/config/services'

import { getAnimeOptions, getMovieOptions, saveSelectedItem } from './movie-api'
import { ServiceInput } from './service-input'

type Props = {
  name?: string
  movie?: Movie
}

export function MovieInput({ name, movie }: Props) {
  const id = useId()
  const [isAnime, setIsAnime] = useState(
    servicesConfig.anime === movie?.serviceName || false
  )
  const handleSwitch = () => setIsAnime(prev => !prev)
  return (
    <div className='relative'>
      <ServiceInput<Movie>
        name={name}
        userService={movie}
        getInputOptions={isAnime ? getAnimeOptions : getMovieOptions}
        saveSelectedItem={saveSelectedItem}
      />
      <div className='absolute right-0 top-0 flex items-center gap-2'>
        <Checkbox
          id={'movie-type' + id}
          checked={isAnime}
          onCheckedChange={handleSwitch}
        />
        <Label className='text-xs font-normal' htmlFor={'movie-type' + id}>
          Anime
        </Label>
      </div>
    </div>
  )
}
