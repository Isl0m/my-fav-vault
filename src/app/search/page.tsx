'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { TextField } from '@/components/input'
import { SearchRequest } from '@/schemas/search.schema'
import { UserOption } from '@/schemas/user-option.schema'

export default function Search() {
  const [query, setQuery] = useState('')
  const [userOptions, setUserOptions] = useState<UserOption[]>([])

  useEffect(() => {
    if (!query) return
    const timeoutId = setTimeout(() => {
      const payload: SearchRequest = { query }
      fetch('/api/user/search?' + new URLSearchParams(payload).toString())
        .then(res => (res.ok ? res.json() : []))
        .then(setUserOptions)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <main className='hero-page-bg min-h-without-header p-24'>
      <div className='mx-auto flex max-w-xl flex-col items-center justify-between gap-8 text-center'>
        <div>
          <h2 className='text-2xl font-bold'>Search</h2>
          <TextField value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div>
          {!!userOptions.length &&
            userOptions.map(user => (
              <div
                className='flex items-center justify-center gap-4'
                key={user.username}
              >
                {user.image && (
                  <Image
                    src={user.image}
                    width={100}
                    height={100}
                    className='rounded-md'
                    alt={user.username}
                  />
                )}
                <div>
                  <h2 className='text-2xl font-bold'>@{user.username}</h2>
                  <p className='text-sm text-slate-500'>{user.email}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}
