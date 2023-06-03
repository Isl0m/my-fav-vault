import Image from 'next/image'
import Link from 'next/link'

import { HeaderAction } from '@/components/header/HeaderAction'
import { NavItem } from '@/components/header/NavItem'

export default function Header() {
  return (
    <header className='mx-auto w-full max-w-7xl items-center p-3 lg:flex lg:justify-between lg:px-3'>
      <Link href='/' className='flex items-center justify-between gap-2'>
        <Image
          src='/myfavvault.svg'
          height={54}
          width={54}
          style={{ width: 54, height: 54 }}
          alt='links store logo'
        />
        <span className='whitespace-nowrap text-3xl'>MyFavVault</span>
      </Link>

      <nav className='text-xl '>
        <ul className='flex space-x-8'>
          <NavItem label='Home' href='/' />
          <NavItem label='Search' href='/search' prefetch={false} />
          <NavItem label='Profile' href='/profile' prefetch={false} />
          <NavItem label='About us' href='/about' prefetch={false} />
        </ul>
      </nav>
      {/* @ts-expect-error Async Server Component */}
      <HeaderAction />
    </header>
  )
}
