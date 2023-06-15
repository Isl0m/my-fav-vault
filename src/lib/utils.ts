import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const SEO = {
  title: 'MyFavVault',
  description:
    'Create your account and personalize your profile by selecting your favorites and share with others.',
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type NotNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>
}

export type Prettify<T> = {
  [K in keyof T]: T[K]
}
