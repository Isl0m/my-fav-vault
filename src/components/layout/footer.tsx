import Link from 'next/link'

import { Icons } from '../icons'

export function Footer() {
  return (
    <footer className='flex items-center justify-between bg-slate-900 p-2 text-slate-300'>
      <h4 className='font-medium tracking-tight'>
        <span className='text-lg'>&copy;</span> MyFavVault. All rights reserved.
      </h4>
      <Link href={'https://github.com/Isl0m/my-fav-vault'} target='_blank'>
        <Icons.gitHub className='mr-2 h-6 w-6' />
      </Link>
    </footer>
  )
}
