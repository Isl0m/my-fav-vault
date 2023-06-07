import { useState } from 'react'

import { useInputQuery } from '@/components/forms/useInputQuery'
import { useInputSelect } from '@/components/forms/useInputSelect'
import { ImagePreviewMemo } from '@/components/image.preview'
import { TextField } from '@/components/input'
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
    <div className='max-w-sm'>
      <div className='flex items-center gap-4'>
        <ImagePreviewMemo
          className='shrink-0'
          imageSrc={selectedItem?.previewImage}
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
          isLoading={isLoading}
          className='grow'
        />
      </div>
      {!!inputOptions?.length && (
        <InputOption data={inputOptions} handleSelectItem={handleSelectItem} />
      )}
    </div>
  )
}
