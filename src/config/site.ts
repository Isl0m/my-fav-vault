import { env } from '@/env.mjs'

export const siteConfig = {
  name: 'MyFavVault',
  description:
    'Create your account and personalize your profile by selecting your favorites and share with others.',
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}OpenGraphImage.png`,
}
