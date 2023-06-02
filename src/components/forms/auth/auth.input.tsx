import { User } from '@prisma/client'

import {
  emailRegex,
  getUsernameRegex,
  passwordRegex,
} from '@/components/forms/auth/auth.regexp'
import { AuthInputProps } from '@/components/forms/auth/auth.types'
import { Usernames } from '@/components/forms/auth/auth.types'
import { HookFormField, HookFormFieldProps } from '@/components/input'

export function AuthInput(props: HookFormFieldProps<Omit<User, 'id'>>) {
  return <HookFormField {...props} />
}

export function EmailAuthInput({ register, errors }: AuthInputProps) {
  return (
    <AuthInput
      name='Email'
      id='email'
      type='email'
      register={register}
      options={{
        required: { value: true, message: 'Email is required' },
        pattern: {
          value: emailRegex,
          message: 'Enter valid email',
        },
      }}
      placeholder='example@example.com'
      error={errors.email}
    />
  )
}

export function PasswordAuthInput({ register, errors }: AuthInputProps) {
  return (
    <AuthInput
      name='Password'
      id='password'
      type='password'
      register={register}
      options={{
        required: { value: true, message: 'Password is required' },
        pattern: {
          value: passwordRegex,
          message:
            'Password should have 1 uppercase, 1 lowercase, 1 number, and be at least 6 letters long.',
        },
      }}
      placeholder='******'
      error={errors.password}
    />
  )
}

export function UsernameAuthInput({
  register,
  errors,
  usernames,
}: AuthInputProps & { usernames: Usernames }) {
  return (
    <AuthInput
      name='User Name'
      id='username'
      type='text'
      register={register}
      options={{
        required: { value: true, message: 'Username is required' },
        pattern: {
          value: getUsernameRegex(usernames),
          message: 'This username already occupied',
        },
      }}
      placeholder='@username'
      error={errors.username}
    />
  )
}
