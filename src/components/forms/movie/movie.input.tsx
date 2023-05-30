'use client'

import { UserMovie } from '@prisma/client'
import { FC, useState } from 'react'

import { InputImagePreviewMemo } from '@/components/forms/InputImagePreview'
import { InputOptionItem } from '@/components/forms/InputOptionItem'
import { useInputQuery } from '@/components/forms/useInputQuery'
import { useInputSelect } from '@/components/forms/useInputSelect'
import { TextField } from '@/components/input'
import { getTmdbImageUrl } from '@/lib/tmdb'
import { TmdbSearchResponse } from '@/schemas/tmdb.schema'

import { getMovieOptions, saveSelectedItem } from './movie.api'

type MovieInputProps = {
  name?: string
  userMovie?: UserMovie
}

export const MovieInput: FC<MovieInputProps> = ({ name, userMovie }) => {
  const [isFocus, setIsFocus] = useState(false)

  const { query, inputOptions, handleSetQuery, resetInputOptions } =
    useInputQuery<UserMovie, TmdbSearchResponse>({
      userItem: userMovie,
      isFocus,
      getInputOptions: getMovieOptions,
    })

  const { selectedItem, handleSelectItem } = useInputSelect<
    UserMovie,
    TmdbSearchResponse
  >({
    userItem: userMovie,
    onSelectBook: handleSetQuery,
    saveSelectedItem,
  })

  return (
    <div>
      <div className='flex items-center'>
        <InputImagePreviewMemo
          imageSrc={
            selectedItem?.posterPath && getTmdbImageUrl(selectedItem.posterPath)
          }
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
          {inputOptions.map(movie => (
            <InputOptionItem
              key={movie.tmdbId}
              title={movie.title}
              subTitle={movie.releaseDate || ''}
              handleMouseDown={() => handleSelectItem(movie)}
              imageSrc={movie.posterPath && getTmdbImageUrl(movie.posterPath)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
