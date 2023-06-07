'use client'

import { UserBook } from '@prisma/client'

import { ServiceInput } from '@/components/forms/ServiceInput'
import {
  getBookOptions,
  saveSelectedItem,
} from '@/components/forms/book/book.api'

type Props = {
  name?: string
  userBook?: UserBook
}

export function BookInput({ name, userBook }: Props) {
  return (
    <ServiceInput<UserBook>
      name={name}
      userService={userBook}
      getInputOptions={getBookOptions}
      saveSelectedItem={saveSelectedItem}
    />
  )
}
