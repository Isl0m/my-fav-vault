import Image from 'next/image'
import Link, { LinkProps } from 'next/link'

const Header = () => {
  return (
    <header className='mx-auto w-full max-w-7xl p-3 lg:flex lg:justify-between lg:px-3'>
      <Link href='/' className='flex items-center justify-between gap-2'>
        <Image
          src='/myfavvault.svg'
          height={48}
          width={48}
          style={{ width: 48, height: 48 }}
          alt='links store logo'
        />
        <span className='whitespace-nowrap text-xl font-semibold dark:text-white'>
          MyFavVault
        </span>
      </Link>
      <div className='relative hidden items-center lg:flex'>
        <nav className='font-semibold leading-6 text-slate-700 dark:text-slate-200'>
          <ul className='flex space-x-8'>
            <NavItem label='Home' href='/' />
            <NavItem label='Search' href='/search' prefetch={false} />
            <NavItem label='Profile' href='/profile' prefetch={false} />
            <NavItem label='About us' href='/about' prefetch={false} />
          </ul>
        </nav>
      </div>
      <button
        type='button'
        className='mb-2 mr-2 rounded-lg bg-purple-500 px-5 py-2.5 text-sm font-medium
        text-white hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700'
      >
        Default
      </button>
    </header>
  )
}

type NavItemProps = LinkProps & {
  label: string
}

const NavItem = ({ label, ...rest }: NavItemProps) => {
  return (
    <li>
      <Link
        {...rest}
        className='hover:text-purple-500 dark:hover:text-purple-400'
      >
        {label}
      </Link>
    </li>
  )
}

export default Header
