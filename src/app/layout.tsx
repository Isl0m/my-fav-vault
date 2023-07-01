import { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { Header } from '@/components/layout/header'
import { NextAuthProvider } from '@/components/providers'

import { env } from '@/env.mjs'
import { SEO } from '@/lib/utils'
import '@/styles/globals.css'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
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
    <html lang='en' className={roboto.className}>
      <body className='noise-bg min-h-screen bg-background text-slate-800 antialiased'>
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
