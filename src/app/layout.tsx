import { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { Provider } from 'react-wrap-balancer'

import { Header } from '@/components/layout/header'
import { NextAuthProvider } from '@/components/providers'

import { siteConfig } from '@/config/site'
import '@/styles/globals.css'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Server Actions',
    'MyFavVault',
    'Music',
    'Movie',
    'Book',
    'Anime',
    'Manga',
  ],
  authors: [
    {
      name: 'dev_islom',
      url: 'https://github.com/Isl0m',
    },
  ],
  creator: 'dev_islom',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={roboto.className}>
      <body className='noise-bg page-bg min-h-screen bg-background text-slate-800 antialiased'>
        <NextAuthProvider>
          <Header />
          <Provider>{children}</Provider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
