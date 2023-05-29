'use client'

import { UserBook } from '@prisma/client'
import { FC, useEffect, useState } from 'react'

import Image from 'next/image'

import { TextField } from '@/components/input'
import {
  GoogleBookResponse,
  GoogleBooksSearchRequest,
} from '@/schemas/google-books.schema'
import { UserBookRequest } from '@/schemas/user-book.schema'

const getBookOptions = (query: string) => {
  const payload: GoogleBooksSearchRequest = { query }
  return fetch('/api/google-books?' + new URLSearchParams(payload).toString())
}

type BookInputProps = {
  name?: string
  userBook?: UserBook
}

export const BookInput: FC<BookInputProps> = ({ name, userBook }) => {
  const [bookId, setBookId] = useState(userBook?.id)
  const [isFocus, setIsFocus] = useState(false)
  const [query, setQuery] = useState(userBook?.title || '')
  const [bookOptions, setBookOptions] = useState<GoogleBookResponse[]>()
  const [selectedBook, setSelectedBook] = useState<
    UserBook | GoogleBookResponse | undefined
  >(userBook)

  useEffect(() => {
    if (selectedBook) {
      const payload: UserBookRequest = { ...selectedBook, id: bookId }

      fetch('/api/user/book', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
        .then(res => {
          if (res.ok) {
            setQuery(selectedBook.title)
          }
          return res.json()
        })
        .then(res => res.id && setBookId(res.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBook])

  useEffect(() => {
    if (!query || !isFocus) return
    const timeoutId = setTimeout(() => {
      getBookOptions(query)
        .then(res => (res.ok ? res.json() : []))
        .then(setBookOptions)
    }, 600)

    return () => clearTimeout(timeoutId)
  }, [query, isFocus])

  return (
    <div>
      <div className='flex items-center'>
        {selectedBook?.thumbnail ? (
          <div className='relative mr-3 aspect-[3/4] h-16 overflow-hidden rounded-md'>
            <Image
              src={selectedBook.thumbnail}
              fill
              style={{ objectFit: 'cover' }}
              sizes='100px, 100px'
              alt={selectedBook.title}
            />
          </div>
        ) : (
          <div className='mr-3 h-16 w-12 rounded-md border-2 border-dashed border-slate-200 bg-slate-300' />
        )}
        <TextField
          name={name}
          value={query}
          onFocus={() => setIsFocus(true)}
          onBlur={() => {
            setIsFocus(false)
            setBookOptions([])
          }}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      {bookOptions && (
        <ul>
          {bookOptions.map(book => (
            <li
              className='flex cursor-pointer items-center gap-4 bg-slate-200 p-4 hover:bg-slate-300'
              onMouseDown={() => setSelectedBook(book)}
              key={book.googleBooksId}
            >
              <div className='relative aspect-[3/4] h-12 overflow-hidden rounded-md'>
                {book.thumbnail ? (
                  <div className='relative aspect-[3/4] h-12 overflow-hidden rounded-md'>
                    <Image
                      src={book.thumbnail}
                      fill
                      sizes='100px, 100px'
                      style={{ objectFit: 'cover' }}
                      alt={book.title}
                    />
                  </div>
                ) : (
                  <div className='inline-flex aspect-[3/4] h-12 items-center justify-center rounded-md bg-slate-300 text-[0.5rem] leading-tight'>
                    No poster
                  </div>
                )}
              </div>

              <div>
                <h5 className='font-medium'>{book.title.slice(0, 18)}...</h5>
                <p className='text-sm'>{book.authors.slice(0, 18)}... </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
