'use client'

import { UserBook } from '@prisma/client'
import { FC, useState } from 'react'

import { InputImagePreviewMemo } from '@/components/forms/InputImagePreview'
import { InputOptionItem } from '@/components/forms/InputOptionItem'
import { useInputQuery } from '@/components/forms/useInputQuery'
import { useInputSelect } from '@/components/forms/useInputSelect'
import { TextField } from '@/components/input'
import { GoogleBookResponse } from '@/schemas/google-books.schema'

import { getBookOptions, saveSelectedItem } from './book.api'

type BookInputProps = {
  name?: string
  userBook?: UserBook
}

export const BookInput: FC<BookInputProps> = ({ name, userBook }) => {
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
    <div>
      <div className='flex items-center'>
        <InputImagePreviewMemo
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
        />
      </div>
      {inputOptions && (
        <ul>
          {inputOptions.map(book => (
            <InputOptionItem
              key={book.googleBooksId}
              title={book.title}
              subTitle={book.authors}
              handleMouseDown={() => handleSelectItem(book)}
              imageSrc={book.thumbnail}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
