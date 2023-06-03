import { PropsWithChildren } from 'react'

export function InputOption({ children }: PropsWithChildren) {
  return <ul className='mt-2 overflow-hidden rounded-lg'>{children}</ul>
}
