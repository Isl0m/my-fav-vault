'use client'

import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { UserCard } from '@/components/user-card'
import { SearchRequest } from '@/schemas/search.schema'
import { UserOption } from '@/schemas/user-option.schema'

export default function Search() {
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [userOptions, setUserOptions] = useState<UserOption[]>([])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(true)
      const payload: SearchRequest = { query }
      fetch('/api/user/search?' + new URLSearchParams(payload).toString())
        .then(res => (res.ok ? res.json() : []))
        .then(setUserOptions)
        .then(() => setIsLoading(false))
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <main className='min-h-without-header py-12'>
      <div className='mx-auto flex max-w-xl flex-col items-center justify-between gap-8 text-center'>
        <div>
          <h1 className='mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Search
          </h1>
          <Input
            value={query}
            disabled={isLoading}
            onChange={e => setQuery(e.target.value)}
            className='bg-muted md:w-96'
            placeholder='Enter query...'
          />
        </div>
        <ul className='flex w-96 flex-col gap-4'>
          {userOptions.length ? (
            userOptions.map(user => (
              <UserCard
                key={user.username}
                username={user.username}
                email={user.email}
                image={user.image}
              />
            ))
          ) : (
            <>
              <Skeleton className='h-24 w-96 rounded-md' />
              <Skeleton className='h-24 w-96 rounded-md' />
            </>
          )}
        </ul>
      </div>
    </main>
  )
}
