import Link from 'next/link'

const Home = () => {
  return (
    <main className='min-h-screen p-24'>
      <div className='mx-auto flex max-w-xl flex-col items-center justify-between gap-8'>
        <h1 className='text-center text-5xl font-black text-slate-900'>
          <span className='underline decoration-purple-400 decoration-8 dark:decoration-purple-600'>
            Sign up,
          </span>{' '}
          fill your info, share profile.
        </h1>
        <p>and show your friends who you are in 3 items. 😉</p>
        <div>
          <Link href='/auth'>
            <button
              type='button'
              className='mb-2 rounded-lg bg-purple-500 px-5 py-2.5 
            text-sm font-medium text-white hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700'
            >
              Get started
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home
