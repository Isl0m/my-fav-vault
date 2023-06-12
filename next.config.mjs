import './src/env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'image.tmdb.org',
      'e-cdns-images.dzcdn.net',
      'books.google.com',
      'kjakppwpxmchcacfwryo.supabase.co'
    ],
  },
}

export default nextConfig
