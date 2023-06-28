import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className='base-page-bg min-h-without-header pt-12 md:pt-28'>
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
  )
}
