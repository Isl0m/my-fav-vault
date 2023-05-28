import { User } from '@prisma/client'
import { FC } from 'react'

import { HookFormField, HookFormFieldProps } from '@/components/input'

export const AuthInput: FC<HookFormFieldProps<Omit<User, 'id'>>> = props => {
  return <HookFormField {...props} />
}
