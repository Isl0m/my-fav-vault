import { useCallback, useEffect, useState } from 'react'

type UserItemBase = {
  title: string
}

type UseInputQueryProps<T extends UserItemBase> = {
  userItem?: T
  isFocus: boolean
  getInputOptions: (query: string) => Promise<Response>
}

export function useInputQuery<T extends UserItemBase, K>({
  userItem,
  isFocus,
  getInputOptions,
}: UseInputQueryProps<T>) {
  const [query, setQuery] = useState(userItem?.title || '')
  const [inputOptions, setInputOptions] = useState<K[]>()

  useEffect(() => {
    if (!query || !isFocus) return
    const timeoutId = setTimeout(() => {
      getInputOptions(query)
        .then(res => (res.ok ? res.json() : []))
        .then(setInputOptions)
    }, 600)

    return () => clearTimeout(timeoutId)
  }, [query, isFocus, getInputOptions])

  const handleSetQuery = useCallback((query: string) => setQuery(query), [])
  const resetInputOptions = () => setInputOptions([])

  return { query, inputOptions, handleSetQuery, resetInputOptions }
}
