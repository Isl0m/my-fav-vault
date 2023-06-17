'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'

import { ImagePreview } from '@/components/image.preview'
import { Input } from '@/components/ui/input'
import { SearchRequest } from '@/schemas/search.schema'
import { UserOption } from '@/schemas/user-option.schema'

export default function Search() {
  const [query, setQuery] = useState('')
  const [userOptions, setUserOptions] = useState<UserOption[]>([])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const payload: SearchRequest = { query }
      fetch('/api/user/search?' + new URLSearchParams(payload).toString())
        .then(res => (res.ok ? res.json() : []))
        .then(setUserOptions)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <main className='hero-page-bg min-h-without-header py-12'>
      <div className='mx-auto flex max-w-xl flex-col items-center justify-between gap-8 text-center'>
        <div>
          <h2 className='mb-2 text-3xl font-semibold tracking-tight'>Search</h2>
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            className='bg-muted md:w-80'
          />
        </div>
        <ul className='flex flex-col gap-4'>
          {!!userOptions.length &&
            userOptions.map(user => (
              <SearchOptionItem user={user} key={user.username} />
            ))}
        </ul>
      </div>
    </main>
  )
}

function SearchOptionItem({ user }: { user: UserOption }) {
  return (
    <li className='cursor-pointer rounded-xl bg-slate-200 p-4 hover:bg-slate-300'>
      <Link
        href={`/@${user.username}`}
        className='flex items-center gap-4 rounded-xl'
      >
        <ImagePreview
          imageSrc={user.image}
          alt={user.username}
          className='aspect-square'
        />
        <div>
          <h2 className='text-2xl font-bold'>@{user.username}</h2>
          <p className='text-sm text-slate-500'>{user.email}</p>
        </div>
      </Link>
    </li>
  )
}
