import { ComponentProps } from 'react'
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

import { Spinner } from '@/components/spinner'
import { cn } from '@/lib/utils'

export type TextFieldProps = ComponentProps<'input'> & {
  isLoading?: boolean
  error?: string
  inputClassName?: string
}
export function TextField({
  id,
  name,
  error,
  className,
  inputClassName,
  isLoading,
  ...rest
}: TextFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className='mb-1 block'>
        {name}
      </label>

      <input
        className={cn(
          'relative block w-full rounded-lg border border-slate-200 bg-slate-200 p-2.5 outline-none focus:border-sky-500 disabled:cursor-not-allowed disabled:bg-slate-300',
          inputClassName
        )}
        {...rest}
        id={id}
        name={name}
        disabled={isLoading}
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
export function HookFormField<T extends FieldValues>({
  name,
  id,
  register,
  options,
  error,
  className,
  inputClassName,
  ...rest
}: HookFormFieldProps<T>) {
  return (
    <div className={className}>
      <label htmlFor={id} className='mb-1 block text-lg'>
        {name}
      </label>
      <input
        className={cn(
          'block w-full rounded-lg border border-slate-200 bg-slate-200 p-2.5 outline-none focus:border-sky-500 disabled:cursor-not-allowed',
          inputClassName
        )}
        {...register(id, options)}
        {...rest}
        id={id}
      />
      {error && <p className='text-sm text-pink-700'>{error.message}</p>}
    </div>
  )
}
