import Link from 'next/link'

import { Balancer } from 'react-wrap-balancer'

import { LucideIcon, Radar, Share2, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: User,
    title: 'Personalized profiles',
    description:
      'You can create their own profiles and showcase their favorite music, movies, books, manga, anime, and more.',
  },
  {
    icon: Radar,
    title: 'Discover new content',
    description:
      'You can explore recommendations based on their preferences and discover new entertainment options.',
  },
  {
    icon: Share2,
    title: 'Share with others',
    description:
      'You can sharing your profile to showcase your personal information and favorites with your friends.',
  },
] satisfies {
  icon: LucideIcon
  title: string
  description: string
}[]

export default function Home() {
  return (
    <>
      <main className='min-h-without-header pt-[18vh]'>
        <div className='mx-auto flex w-11/12 flex-col items-center justify-between gap-8 text-center sm:max-w-xl'>
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Sign up, fill your info, share profile.
          </h1>
          <p className='text-lg leading-7'>
            Create your account and personalize your profile by selecting your
            favorites and share with others.
          </p>
          <Button>
            <Link href='/signin'>Get started</Link>
          </Button>
        </div>
      </main>
      <section className='flex min-h-screen  flex-col items-center'>
        <div className='mx-auto w-11/12 md:max-w-5xl'>
          <h2 className='text-center text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Features
          </h2>
          <ul className='mt-16 grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {features.map(feature => (
              <li key={feature.title}>
                <Card>
                  <CardHeader className='items-center'>
                    <feature.icon size={80} strokeWidth={1} />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className='text-slate-500'>
                    <Balancer>{feature.description}</Balancer>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
