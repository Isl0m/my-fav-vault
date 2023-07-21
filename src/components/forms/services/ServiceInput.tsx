import { useState } from 'react'

import { useInputQuery } from '@/components/forms/useInputQuery'
import { useInputSelect } from '@/components/forms/useInputSelect'
import { ImageOrBlankMemo } from '@/components/image-preview'
import { Input } from '@/components/ui/input'

import { UserService } from '@/schemas/user-service.schema'

import { InputOption } from './InputOption'

export type ServiceInputProps<T> = {
  name?: string
  userService?: T
  getInputOptions: (query: string) => Promise<Response>
  saveSelectedItem: (
    selectedItem: T | UserService,
    itemId?: string
  ) => Promise<Response>
}

export function ServiceInput<T extends UserService>({
  name,
  userService,
  getInputOptions,
  saveSelectedItem,
}: ServiceInputProps<T>) {
  const [isFocus, setIsFocus] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { query, inputOptions, handleSetQuery, resetInputOptions } =
    useInputQuery<T>({
      userService,
      isFocus,
      getInputOptions,
    })

  const { selectedItem, handleSelectItem } = useInputSelect<T>({
    userService,
    onSelectBook: handleSetQuery,
    saveSelectedItem,
    setLoading: (state: boolean) => setIsLoading(state),
  })

  return (
    <div>
      <div className='flex items-center gap-4'>
        <ImageOrBlankMemo
          className='shrink-0'
          imageSrc={selectedItem?.previewImage}
          alt={selectedItem?.title}
        />

        <Input
          name={name}
          value={query}
          onFocus={() => setIsFocus(true)}
          onBlur={() => {
            setIsFocus(false)
            resetInputOptions()
          }}
          onChange={e => handleSetQuery(e.target.value)}
          disabled={isLoading}
          className='w-full'
        />
      </div>
      {!!inputOptions?.length && (
        <InputOption data={inputOptions} handleSelectItem={handleSelectItem} />
      )}
    </div>
  )
}
