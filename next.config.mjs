import './src/env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'image.tmdb.org',
      'media.kitsu.io',
      'e-cdns-images.dzcdn.net',
      'books.google.com',
      'kjakppwpxmchcacfwryo.supabase.co',
      'avatars.githubusercontent.com',
    ],
  },
}

export default nextConfig
