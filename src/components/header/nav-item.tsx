import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

type NavItemProps = LinkProps & {
  label: string
}

export function NavItem({ label, href, ...rest }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <Link
      {...rest}
      href={href}
      className={cn(
        'leading-7 text-muted-foreground transition-colors hover:text-primary',
        isActive && 'text-primary'
      )}
    >
      {label}
    </Link>
  )
}
