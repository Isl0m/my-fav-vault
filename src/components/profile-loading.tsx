import { Skeleton } from '@ui/skeleton'

export default function ProfileLoading() {
  return (
    <main className=' mt-8 min-h-screen md:pb-24'>
      <div className='mx-auto flex max-w-[95vw] flex-col items-center justify-between gap-8 md:max-w-2xl'>
        <div className='flex items-center justify-center gap-4'>
          <Skeleton className='h-24 w-24 rounded-md' />
          <div className='w-44'>
            <Skeleton className='h-8' />
            <Skeleton className='mt-2 h-5' />
          </div>
        </div>
        <div>
          <Skeleton className='h-10 w-32 rounded-md' />
        </div>
        <ProfileCardsLoading />
      </div>
    </main>
  )
}

export function ProfileCardsLoading() {
  return (
    <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2'>
      <Skeleton className='h-[360px] w-80 rounded-lg' />
      <Skeleton className='h-[360px] w-80 rounded-lg' />
    </div>
  )
}
