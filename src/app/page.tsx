import Image from 'next/image'
import Link from 'next/link'

import { Balancer } from 'react-wrap-balancer'

import { LucideIcon, Radar, Share2, User } from 'lucide-react'

import { Footer } from '@/components/layout/footer'
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

const howItWorks = [
  {
    image: '/Secure.svg',
    title: 'Authorize with your preferred sign in method',
  },
  {
    image: '/Coder.svg',
    title: 'Choose your unique username for main way to find you',
  },
  {
    image: '/Form.svg',
    title: 'Fill your profile with your favorite musics, movies, books',
  },
] satisfies {
  image: string
  title: string
}[]

export default function Home() {
  return (
    <>
      <main className='min-h-without-header pt-[20vh]'>
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
      <section className='flex min-h-[80vh] flex-col items-center'>
        <div className='mx-auto w-11/12 md:max-w-5xl'>
          <h2 className='text-center text-4xl font-extrabold tracking-tight lg:text-5xl'>
            Features
          </h2>
          <ul className='mt-16 grid grid-cols-1 items-center justify-center justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {features.map(feature => (
              <li className='max-w-sm md:max-w-md' key={feature.title}>
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
      <section className='my-16 flex min-h-[80vh] flex-col items-center lg:mt-0'>
        <div className='mx-auto w-11/12 md:max-w-5xl'>
          <h2 className='text-center text-4xl font-extrabold tracking-tight lg:text-5xl'>
            How it works
          </h2>
          <ul className='mt-16 grid grid-cols-1 items-center justify-center justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {howItWorks.map((item, index) => (
              <li className='max-w-sm md:max-w-md' key={item.title}>
                <Card>
                  <CardHeader className='items-center'>
                    <Image
                      src={item.image}
                      width={144}
                      height={144}
                      alt={'howitworks-card' + index}
                    />
                  </CardHeader>
                  <CardContent>
                    <span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white'>
                      {index + 1}
                    </span>
                    <h5 className='mt-2 text-lg font-medium tracking-tight text-slate-700'>
                      <Balancer>{item.title}</Balancer>
                    </h5>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  )
}
