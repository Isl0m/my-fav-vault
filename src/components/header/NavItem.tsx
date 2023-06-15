import Link, { LinkProps } from 'next/link'

type NavItemProps = LinkProps & {
  label: string
}

export function NavItem({ label, ...rest }: NavItemProps) {
  return (
    <li>
      <Link {...rest} className='hover:text-sky-500'>
        {label}
      </Link>
    </li>
  )
}
