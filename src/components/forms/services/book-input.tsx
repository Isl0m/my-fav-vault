'use client'

import { useId, useState } from 'react'

import { Book } from '@prisma/client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { servicesConfig } from '@/config/services'

import { getBookOptions, getMangaOptions, saveSelectedItem } from './book-api'
import { ServiceInput } from './service-input'

type Props = {
  name?: string
  book?: Book
}

export function BookInput({ name, book }: Props) {
  const id = useId()
  const [isManga, setIsManga] = useState(
    servicesConfig.manga === book?.serviceName || false
  )
  const handleSwitch = () => setIsManga(prev => !prev)
  return (
    <div className='relative'>
      <ServiceInput<Book>
        name={name}
        userService={book}
        getInputOptions={isManga ? getMangaOptions : getBookOptions}
        saveSelectedItem={saveSelectedItem}
      />
      <div className='absolute right-0 top-0 flex items-center gap-2'>
        <Checkbox
          id={'movie-type' + id}
          checked={isManga}
          onCheckedChange={handleSwitch}
        />
        <Label className='text-xs font-normal' htmlFor={'movie-type' + id}>
          Manga
        </Label>
      </div>
    </div>
  )
}
