import clsx from 'clsx'

import { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import Header from '@/components/header'

import './globals.css'
import { NextAuthProvider } from './providers'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'MyFavVault',
  description:
    'Create your account and personalize your profile by selecting your favorites and share with others.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={clsx(roboto.className, 'noise-bg text-slate-800')}>
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
