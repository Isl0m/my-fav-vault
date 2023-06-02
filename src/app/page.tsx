import Link from 'next/link'

import { Button } from '@/components/buttons'

const Home = () => {
  return (
    <main className='hero-page-bg min-h-screen p-24'>
      <div className='mx-auto flex max-w-xl flex-col items-center justify-between gap-8 text-center'>
        <h1 className='text-6xl font-bold '>
          Sign up, fill your info, share profile.
        </h1>
        <p className='text-xl'>
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

export default Home
