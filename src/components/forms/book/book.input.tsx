'use client'

import { UserBook } from '@prisma/client'
import { useState } from 'react'

import { ImagePreviewMemo } from '@/components/ImagePreview'
import { InputOptionItem } from '@/components/forms/InputOptionItem'
import { useInputQuery } from '@/components/forms/useInputQuery'
import { useInputSelect } from '@/components/forms/useInputSelect'
import { TextField } from '@/components/input'
import { GoogleBookResponse } from '@/schemas/google-books.schema'

import { InputOption } from '../InputOption'

import { getBookOptions, saveSelectedItem } from './book.api'

type BookInputProps = {
  name?: string
  userBook?: UserBook
}

export function BookInput({ name, userBook }: BookInputProps) {
  const [isFocus, setIsFocus] = useState(false)
  const { query, inputOptions, handleSetQuery, resetInputOptions } =
    useInputQuery<UserBook, GoogleBookResponse>({
      userItem: userBook,
      isFocus,
      getInputOptions: getBookOptions,
    })

  const { selectedItem, handleSelectItem } = useInputSelect<
    UserBook,
    GoogleBookResponse
  >({
    userItem: userBook,
    onSelectBook: handleSetQuery,
    saveSelectedItem,
  })

  return (
    <div className='max-w-sm'>
      <div className='flex items-center gap-4'>
        <ImagePreviewMemo
          className='shrink-0'
          imageSrc={selectedItem?.thumbnail}
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
          {inputOptions.map(book => (
            <InputOptionItem
              key={book.googleBooksId}
              title={book.title}
              subTitle={book.authors}
              handleMouseDown={() => handleSelectItem(book)}
              imageSrc={book.thumbnail}
            />
          ))}
        </InputOption>
      )}
    </div>
  )
}
