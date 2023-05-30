'use client'

import { UserMusic } from '@prisma/client'
import { FC, useState } from 'react'

import { InputImagePreviewMemo } from '@/components/forms/InputImagePreview'
import { InputOptionItem } from '@/components/forms/InputOptionItem'
import { useInputQuery } from '@/components/forms/useInputQuery'
import { useInputSelect } from '@/components/forms/useInputSelect'
import { TextField } from '@/components/input'
import { DeezerSearchResponse } from '@/schemas/deezer.schema'

import { getMusicOptions, saveSelectedItem } from './music.api'

type MusicInputProps = {
  name?: string
  userMusic?: UserMusic
}

export const MusicInput: FC<MusicInputProps> = ({ name, userMusic }) => {
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
    <div>
      <div className='flex items-center'>
        <InputImagePreviewMemo
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
        />
      </div>
      {inputOptions && (
        <ul>
          {inputOptions.map(music => (
            <InputOptionItem
              key={music.deezerId}
              title={music.title}
              subTitle={music.artist}
              handleMouseDown={() => handleSelectItem(music)}
              imageSrc={music.cover}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
