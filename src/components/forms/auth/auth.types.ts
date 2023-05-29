import { User } from '@prisma/client'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

export type AuthFormFields = Omit<User, 'id'>

export type Usernames = { username: string | null }[]

export type AuthFormProps = {
  usernames: Usernames
}

export type AuthInputProps = {
  register: UseFormRegister<AuthFormFields>
  errors: FieldErrors<AuthFormFields>
}
