'use client'

import { UserMovie } from '@prisma/client'
import { FC, useEffect, useState } from 'react'

import Image from 'next/image'

import { TextField } from '@/components/input'
import { getTmdbImageUrl } from '@/lib/tmdb'
import { TmdbSearchRequest, TmdbSearchResponse } from '@/schemas/tmdb.schema'
import { UserMovieRequest } from '@/schemas/user-movie.schema'

const getMovieOptions = (query: string) => {
  const payload: TmdbSearchRequest = { query }
  return fetch('/api/tmdb?' + new URLSearchParams(payload).toString())
}

type MovieInputProps = {
  name?: string
  userMovie?: UserMovie
}

export const MovieInput: FC<MovieInputProps> = ({ name, userMovie }) => {
  const [movieId, setMovieId] = useState(userMovie?.id)
  const [isFocus, setIsFocus] = useState(false)
  const [query, setQuery] = useState(userMovie?.title)
  const [movieOptions, setMovieOptions] = useState<TmdbSearchResponse[]>()
  const [selectedMovie, setSelectedMovie] = useState<
    UserMovie | TmdbSearchResponse | undefined
  >(userMovie)

  useEffect(() => {
    if (selectedMovie) {
      const payload: UserMovieRequest = { ...selectedMovie, id: movieId }

      fetch('/api/user/movie', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
        .then(res => {
          if (res.ok) {
            setQuery(selectedMovie.title)
          }
          return res.json()
        })
        .then(res => res.id && setMovieId(res.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMovie])

  useEffect(() => {
    if (!query || !isFocus) return
    const timeoutId = setTimeout(() => {
      getMovieOptions(query)
        .then(res => res.json())
        .then(setMovieOptions)
    }, 600)

    return () => clearTimeout(timeoutId)
  }, [query, isFocus])

  return (
    <div>
      <div className='flex items-center'>
        {selectedMovie?.posterPath ? (
          <div className='relative mr-3 aspect-[3/4] h-16 overflow-hidden rounded-md'>
            <Image
              src={getTmdbImageUrl(selectedMovie.posterPath)}
              fill
              style={{ objectFit: 'cover' }}
              sizes='100px, 100px'
              alt={selectedMovie.title}
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
            setMovieOptions([])
          }}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      {movieOptions && (
        <ul>
          {movieOptions.map(movie => (
            <li
              className='flex cursor-pointer items-center gap-4 bg-slate-200 p-4 hover:bg-slate-300'
              onMouseDown={() => setSelectedMovie(movie)}
              key={movie.tmdbId}
            >
              {movie.posterPath ? (
                <div className='relative aspect-[3/4] h-12 overflow-hidden rounded-md'>
                  <Image
                    src={getTmdbImageUrl(movie.posterPath)}
                    fill
                    sizes='100px, 100px'
                    style={{ objectFit: 'cover' }}
                    alt={movie.title}
                  />
                </div>
              ) : (
                <div className='inline-flex h-12 w-12 items-center justify-center rounded-md bg-slate-300 text-[0.5rem] leading-tight'>
                  No poster
                </div>
              )}
              <div>
                <h5 className='font-medium'>{movie.title.slice(0, 18)}...</h5>
                <p className='text-sm'>{movie.releaseDate?.split('-')[0]}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
