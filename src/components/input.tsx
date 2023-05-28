import { ComponentProps, FC } from 'react'
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

export type TextFieldProps = ComponentProps<'input'> & { error?: string }
export const TextField: FC<TextFieldProps> = ({ id, name, error, ...rest }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className='mb-1 block text-sm font-medium text-gray-900 dark:text-white'
      >
        {name}
      </label>
      <input
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
        {...rest}
        id={id}
        name={name}
      />
      {error && <p className='text-sm text-pink-700'>{error}</p>}
    </div>
  )
}

export type HookFormFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'error'
> & {
  id: Path<T>
  register: UseFormRegister<T>
  options?: RegisterOptions
  error?: FieldError
}
export const HookFormField = <T extends FieldValues>({
  name,
  id,
  register,
  options,
  error,
  ...rest
}: HookFormFieldProps<T>) => {
  return (
    <div>
      <label
        htmlFor={id}
        className='mb-1 block text-sm font-medium text-gray-900 dark:text-white'
      >
        {name}
      </label>
      <input
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
        {...register(id, options)}
        {...rest}
        id={id}
      />
      {error && <p className='text-sm text-pink-700'>{error.message}</p>}
    </div>
  )
}
