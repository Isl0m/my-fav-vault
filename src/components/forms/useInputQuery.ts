import { useCallback, useEffect, useState } from 'react'

import { UserService } from '@/schemas/user-service.schema'

type UseInputQueryProps<T extends UserService> = {
  userService?: T
  isFocus: boolean
  getInputOptions: (query: string) => Promise<Response>
}

export function useInputQuery<T extends UserService>({
  userService,
  isFocus,
  getInputOptions,
}: UseInputQueryProps<T>) {
  const [query, setQuery] = useState(userService?.title || '')
  const [inputOptions, setInputOptions] = useState<UserService[]>()

  useEffect(() => {
    if (!query || !isFocus) return
    const timeoutId = setTimeout(() => {
      getInputOptions(query)
        .then(res => (res.ok ? res.json() : []))
        .then(setInputOptions)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [query, isFocus, getInputOptions])

  const handleSetQuery = useCallback((query: string) => setQuery(query), [])
  const resetInputOptions = () => setInputOptions([])

  return { query, inputOptions, handleSetQuery, resetInputOptions }
}
