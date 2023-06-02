import { ComponentProps, FC } from 'react'
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

import { cn } from '@/lib/utils-server'

export type TextFieldProps = ComponentProps<'input'> & {
  error?: string
  inputClassName?: string
}
export const TextField: FC<TextFieldProps> = ({
  id,
  name,
  error,
  className,
  inputClassName,
  ...rest
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className='mb-1 block'>
        {name}
      </label>
      <input
        className={cn(
          'block w-full rounded-lg border border-slate-200 bg-slate-200 p-2.5 outline-none focus:border-sky-500 disabled:cursor-not-allowed',
          inputClassName
        )}
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
  className,
  inputClassName,
  ...rest
}: HookFormFieldProps<T>) => {
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
