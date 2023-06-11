'use client'

import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

import Image from 'next/image'
import Link from 'next/link'

import { HeaderAction } from '@/components/header/HeaderAction'
import { NavItem } from '@/components/header/NavItem'

import { Button } from '../buttons'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(prev => !prev)
  return (
    <header>
      <div className='mx-auto flex w-full max-w-7xl items-center justify-between p-3 px-3'>
        <Link href='/' className='flex items-center justify-center gap-2'>
          <Image
            src='/myfavvault.svg'
            height={54}
            width={54}
            style={{ width: 54, height: 54 }}
            alt='links store logo'
          />
          <span className='whitespace-nowrap text-xl md:text-3xl'>
            MyFavVault
          </span>
        </Link>

        <nav className='hidden text-xl md:block'>
          <ul className='flex space-x-8'>
            <NavItem label='Home' href='/' />
            <NavItem label='Search' href='/search' prefetch={false} />
            <NavItem label='Profile' href='/profile' prefetch={false} />
            <NavItem label='About us' href='/about' prefetch={false} />
          </ul>
        </nav>
        <div className='hidden md:block'>
          <HeaderAction />
        </div>
        <Button
          className='block px-2.5 transition duration-150 ease-in-out md:hidden'
          onClick={toggleMenu}
          aria-label='Toggle Menu'
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </Button>
      </div>

      {isOpen && (
        <nav className='block text-xl md:hidden'>
          <ul className='flex flex-col items-center gap-2'>
            <NavItem label='Home' href='/' />
            <NavItem label='Search' href='/search' prefetch={false} />
            <NavItem label='Profile' href='/profile' prefetch={false} />
            <NavItem label='About us' href='/about' prefetch={false} />
            <HeaderAction />
          </ul>
        </nav>
      )}
    </header>
  )
}
