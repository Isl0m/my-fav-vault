import { User } from '@prisma/client'
import { FC } from 'react'

import { Input, InputProps } from '@/components/input.component'

export const AuthInput: FC<InputProps<Omit<User, 'id'>>> = props => {
  return <Input {...props} />
}
