import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type NotNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>
}

export type Prettify<T> = {
  [K in keyof T]: T[K]
}
