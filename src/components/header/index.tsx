'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'

import { Menu, X } from 'lucide-react'

import { HeaderAction } from '@/components/header/header-action'
import { NavItem } from '@/components/header/nav-item'

import { Button } from '../ui/button'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(prev => !prev)
  return (
    <header>
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between p-3 px-3'>
        <Link href='/' className='flex items-center justify-center gap-2'>
          <Image
            src='/myfavvault.svg'
            height={32}
            width={32}
            style={{ width: 32, height: 32 }}
            alt='links store logo'
          />
          <span className='text-2xl font-semibold tracking-tight'>
            MyFavVault
          </span>
        </Link>

        <nav className='hidden space-x-8 md:flex'>
          <NavItem label='Home' href='/' />
          <NavItem label='Search' href='/search' prefetch={false} />
          <NavItem label='Profile' href='/profile' prefetch={false} />
          <NavItem label='About us' href='/about' prefetch={false} />
        </nav>
        <div className='hidden md:block'>
          <HeaderAction />
        </div>
        <Button
          className='block px-2 transition duration-150 ease-in-out md:hidden'
          onClick={toggleMenu}
          aria-label='Toggle Menu'
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {isOpen && (
        <nav className='flex flex-col items-center gap-2 md:hidden'>
          <NavItem label='Home' href='/' />
          <NavItem label='Search' href='/search' prefetch={false} />
          <NavItem label='Profile' href='/profile' prefetch={false} />
          <NavItem label='About us' href='/about' prefetch={false} />
          <HeaderAction />
        </nav>
      )}
    </header>
  )
}
