'use client'

import { UserMusic } from '@prisma/client'
import { FC, useEffect, useState } from 'react'

import Image from 'next/image'

import { TextField } from '@/components/input'
import {
  DeezerSearchRequest,
  DeezerSearchResponse,
} from '@/schemas/deezer.schema'
import { UserMusicRequest } from '@/schemas/user-music.schema'

const getMusicOptions = (query: string) => {
  const payload: DeezerSearchRequest = { query }
  return fetch('/api/deezer?' + new URLSearchParams(payload).toString())
}

type MusicInputProps = {
  name?: string
  userMusic?: UserMusic
}

export const MusicInput: FC<MusicInputProps> = ({ name, userMusic }) => {
  const [musicId, setMusicId] = useState(userMusic?.id)
  const [isFocus, setIsFocus] = useState(false)
  const [query, setQuery] = useState(userMusic?.title)
  const [musicOptions, setMusicOptions] = useState<DeezerSearchResponse[]>()
  const [selectedMusic, setSelectedMusic] = useState<
    UserMusic | DeezerSearchResponse | undefined
  >(userMusic)

  useEffect(() => {
    if (selectedMusic) {
      const payload: UserMusicRequest = { ...selectedMusic, id: musicId }

      fetch('/api/user/music', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
        .then(res => {
          if (res.ok) {
            setQuery(selectedMusic.title)
          }
          return res.json()
        })
        .then(res => res.id && setMusicId(res.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMusic])

  useEffect(() => {
    if (!query || !isFocus) return
    const timeoutId = setTimeout(() => {
      getMusicOptions(query)
        .then(res => res.json())
        .then(setMusicOptions)
    }, 600)

    return () => clearTimeout(timeoutId)
  }, [query, isFocus])

  return (
    <div>
      <div className='flex items-center'>
        {selectedMusic?.cover ? (
          <div className='relative mr-3 aspect-[3/4] h-16 overflow-hidden rounded-md'>
            <Image
              src={selectedMusic.cover}
              fill
              style={{ objectFit: 'cover' }}
              sizes='100px, 100px'
              alt={selectedMusic.title}
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
            setMusicOptions([])
          }}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      {musicOptions && (
        <ul>
          {musicOptions.map(music => (
            <li
              className='flex cursor-pointer items-center gap-4 bg-slate-200 p-4 hover:bg-slate-300'
              onMouseDown={() => setSelectedMusic(music)}
              key={music.deezerId}
            >
              <div className='relative aspect-[3/4] h-12 overflow-hidden rounded-md'>
                <Image
                  src={music.cover}
                  fill
                  sizes='100px, 100px'
                  style={{ objectFit: 'cover' }}
                  alt={music.title}
                />
              </div>

              <div>
                <h5 className='font-medium'>{music.title.slice(0, 18)}...</h5>
                <p className='text-sm'>{music.artist}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
