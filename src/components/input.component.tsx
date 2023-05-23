import { ComponentProps } from 'react'
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

export type InputProps<T extends FieldValues> = ComponentProps<'input'> & {
  name: string
  label: Path<T>
  register: UseFormRegister<T>
  options?: RegisterOptions
  error?: FieldError
}
export const Input = <T extends FieldValues>({
  name,
  label,
  register,
  options,
  error,
  ...rest
}: InputProps<T>) => {
  return (
    <div>
      <label
        htmlFor={label}
        className='mb-1 block text-sm font-medium text-gray-900 dark:text-white'
      >
        {name}
      </label>
      <input
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
        {...register(label, options)}
        {...rest}
        id={label}
      />
      {error && <p className='text-sm text-pink-700'>{error.message}</p>}
    </div>
  )
}
