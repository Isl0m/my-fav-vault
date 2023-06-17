import { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import clsx from 'clsx'

import Header from '@/components/header'
import { env } from '@/env.mjs'
import { SEO, cn } from '@/lib/utils'

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
    images: [`${env.NEXT_PUBLIC_APP_URL}OpenGraphImage.png`],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'noise-bg min-h-screen bg-background text-slate-800 antialiased',
          roboto.className
        )}
      >
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
