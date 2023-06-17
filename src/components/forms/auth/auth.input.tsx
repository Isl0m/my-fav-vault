import {
  emailRegex,
  getUsernameRegex,
  passwordRegex,
} from '@/components/forms/auth/auth.regexp'
import { AuthInputProps } from '@/components/forms/auth/auth.types'
import { Usernames } from '@/components/forms/auth/auth.types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function EmailAuthInput({ register, errors }: AuthInputProps) {
  return (
    <>
      <Label htmlFor='email'>Email</Label>
      <Input
        id='email'
        type='email'
        {...register('email', {
          required: { value: true, message: 'Email is required' },
          pattern: {
            value: emailRegex,
            message: 'Enter valid email',
          },
        })}
        placeholder='example@example.com'
      />
      {errors.email && (
        <p className='text-sm font-medium text-destructive'>
          {errors.email.message}
        </p>
      )}
    </>
  )
}

export function PasswordAuthInput({ register, errors }: AuthInputProps) {
  return (
    <>
      <Label htmlFor='password'>Password</Label>
      <Input
        id='password'
        type='password'
        {...register('password', {
          required: { value: true, message: 'Password is required' },
          pattern: {
            value: passwordRegex,
            message:
              'Password should have 1 uppercase, 1 lowercase, 1 number, and be at least 6 letters long.',
          },
        })}
        placeholder='******'
      />
      {errors.password && (
        <p className='text-sm font-medium text-destructive'>
          {errors.password.message}
        </p>
      )}
    </>
  )
}

export function UsernameAuthInput({
  register,
  usernames,
  errors,
}: AuthInputProps & { usernames: Usernames }) {
  return (
    <>
      <Label htmlFor='username'>Username</Label>
      <Input
        id='username'
        type='text'
        {...register('username', {
          required: { value: true, message: 'Username is required' },
          pattern: {
            value: getUsernameRegex(usernames),
            message: 'This username already occupied',
          },
        })}
        placeholder='@username'
      />
      {errors.username && (
        <p className='text-sm font-medium text-destructive'>
          {errors.username.message}
        </p>
      )}
    </>
  )
}
