import { UsernameForm } from '@/components/forms/username.form'

const Username = async () => {
  return (
    <main className='min-h-screen py-12'>
      <div className='mx-auto flex max-w-xl flex-col items-center justify-between gap-8'>
        <h1 className='text-center text-4xl font-semibold text-slate-900'>
          Set Username
        </h1>
        <UsernameForm />
      </div>
    </main>
  )
}

export default Username
