import Link from 'next/link'

import { Button } from '@/components/buttons'

export default function Home() {
  return (
    <main className='hero-page-bg min-h-without-header pt-12 md:py-24'>
      <div className='mx-auto flex w-11/12 flex-col items-center justify-between gap-8 text-center sm:max-w-xl'>
        <h1 className='text-4xl font-bold md:text-6xl'>
          Sign up, fill your info, share profile.
        </h1>
        <p className='text-lg md:text-xl'>
          Create your account and personalize your profile by selecting your
          favorites and share with others.
        </p>
        <div>
          <Link href='/auth'>
            <Button>Get started</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
