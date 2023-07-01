'use client'

import { useState } from 'react'

import { UserBook } from '@prisma/client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import { ServiceInput } from './ServiceInput'
import { getBookOptions, getMangaOptions, saveSelectedItem } from './book-api'

type Props = {
  name?: string
  userBook?: UserBook
}

export function BookInput({ name, userBook }: Props) {
  const [isManga, setIsManga] = useState(false)
  const handleSwitch = () => setIsManga(prev => !prev)
  return (
    <div className='relative'>
      <ServiceInput<UserBook>
        name={name}
        userService={userBook}
        getInputOptions={isManga ? getMangaOptions : getBookOptions}
        saveSelectedItem={saveSelectedItem}
      />
      <div className='absolute right-0 top-0 flex items-center gap-2'>
        <Checkbox
          id='movie-type'
          checked={isManga}
          onCheckedChange={handleSwitch}
        />
        <Label className='text-xs font-normal' htmlFor='movie-type'>
          Manga
        </Label>
      </div>
    </div>
  )
}
