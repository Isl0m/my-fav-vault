'use client'

import { UserMusic } from '@prisma/client'
import { useState } from 'react'

import { ImagePreviewMemo } from '@/components/ImagePreview'
import { InputOptionItem } from '@/components/forms/InputOptionItem'
import { useInputQuery } from '@/components/forms/useInputQuery'
import { useInputSelect } from '@/components/forms/useInputSelect'
import { TextField } from '@/components/input'
import { DeezerSearchResponse } from '@/schemas/deezer.schema'

import { InputOption } from '../InputOption'

import { getMusicOptions, saveSelectedItem } from './music.api'

type MusicInputProps = {
  name?: string
  userMusic?: UserMusic
}

export function MusicInput({ name, userMusic }: MusicInputProps) {
  const [isFocus, setIsFocus] = useState(false)

  const { query, inputOptions, handleSetQuery, resetInputOptions } =
    useInputQuery<UserMusic, DeezerSearchResponse>({
      userItem: userMusic,
      isFocus,
      getInputOptions: getMusicOptions,
    })

  const { selectedItem, handleSelectItem } = useInputSelect<
    UserMusic,
    DeezerSearchResponse
  >({
    userItem: userMusic,
    onSelectBook: handleSetQuery,
    saveSelectedItem,
  })

  return (
    <div className='max-w-sm'>
      <div className='flex items-center gap-4'>
        <ImagePreviewMemo
          className='shrink-0'
          imageSrc={selectedItem?.cover}
          alt={selectedItem?.title}
        />
        <TextField
          name={name}
          value={query}
          onFocus={() => setIsFocus(true)}
          onBlur={() => {
            setIsFocus(false)
            resetInputOptions()
          }}
          onChange={e => handleSetQuery(e.target.value)}
          className='grow'
        />
      </div>
      {inputOptions && (
        <InputOption>
          {inputOptions.map(music => (
            <InputOptionItem
              key={music.deezerId}
              title={music.title}
              subTitle={music.artist}
              handleMouseDown={() => handleSelectItem(music)}
              imageSrc={music.cover}
            />
          ))}
        </InputOption>
      )}
    </div>
  )
}
