import { useEffect, useState } from 'react'

type UserItemBase = {
  title: string
  id: string
}

type UserItemResponseBase = {
  title: string
}

type UseInputSelectProps<
  T extends UserItemBase,
  K extends UserItemResponseBase
> = {
  userItem?: T
  onSelectBook: (query: string) => void
  saveSelectedItem: (selectedItem: T | K, itemId?: string) => Promise<Response>
}

export function useInputSelect<
  T extends UserItemBase,
  K extends UserItemResponseBase
>({ userItem, onSelectBook, saveSelectedItem }: UseInputSelectProps<T, K>) {
  const [itemId, setItemId] = useState(userItem?.id)
  const [selectedItem, setSelectedItem] = useState<T | K | undefined>(userItem)

  useEffect(() => {
    if (selectedItem) {
      saveSelectedItem(selectedItem, itemId)
        .then(res => {
          if (res.ok) {
            onSelectBook(selectedItem.title)
          }
          return res.json()
        })
        .then(res => res.id && setItemId(res.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem])

  const handleSelectItem = (book?: K) => setSelectedItem(book)

  return { selectedItem, handleSelectItem }
}
