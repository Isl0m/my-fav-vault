import { useEffect, useState } from 'react'

import { UserService } from '@/schemas/user-service.schema'

type UseInputSelectProps<T extends UserService> = {
  userService?: T
  onSelectBook: (query: string) => void
  saveSelectedItem: (
    selectedItem: T | UserService,
    itemId?: string
  ) => Promise<Response>
  setLoading: (state: boolean) => void
}

export function useInputSelect<T extends UserService>({
  userService,
  onSelectBook,
  saveSelectedItem,
  setLoading,
}: UseInputSelectProps<T>) {
  const [itemId, setItemId] = useState(userService?.id)
  const [selectedItem, setSelectedItem] = useState<T | UserService | undefined>(
    userService
  )

  useEffect(() => {
    if (selectedItem) {
      setLoading(true)
      saveSelectedItem(selectedItem, itemId)
        .then(res => {
          if (res.ok) {
            onSelectBook(selectedItem.title)
          }
          return res.json()
        })
        .then(res => {
          if (res.id) {
            setItemId(res.id)
            setLoading(false)
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem])

  const handleSelectItem = (item?: UserService) => setSelectedItem(item)

  return { selectedItem, handleSelectItem }
}
