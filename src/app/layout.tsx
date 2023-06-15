import clsx from 'clsx'

import { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import Header from '@/components/header'
import { SEO } from '@/lib/utils'

import './globals.css'
import { NextAuthProvider } from './providers'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  openGraph: {
    siteName: SEO.title,
    description: SEO.description,
    images: ['https://my-fav-vault.vercel.app/myfavvault.svg'],
  },
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
