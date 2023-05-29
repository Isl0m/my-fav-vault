import { Usernames } from '@/components/forms/auth/auth.types'

export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/

export const getUsernameRegex = (usernames: Usernames) => {
  const filtredUsernames = usernames
    .map(item => `(?!${item.username})`)
    .join('')
  if (filtredUsernames.includes('undefinde')) {
    return new RegExp('')
  }
  return new RegExp(`^(${filtredUsernames}.)*$`)
}
