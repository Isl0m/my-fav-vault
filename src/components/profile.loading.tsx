import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProfileLoading() {
  return (
    <SkeletonTheme baseColor='#E8E8E8' highlightColor='#E0E0E0'>
      <main className='base-page-bg mt-8 min-h-screen md:pb-24'>
        <div className='mx-auto flex max-w-[95vw] flex-col items-center justify-between gap-8 md:max-w-2xl'>
          <div className='flex items-center justify-center gap-4'>
            <Skeleton width={100} height={100} borderRadius={6} />
            <div className='w-44'>
              <Skeleton height={32} />
              <Skeleton height={20} />
            </div>
          </div>
          <div>
            <Skeleton height={45} width={130} borderRadius={8} />
          </div>
          <div className='grid grid-cols-1 justify-center gap-8 md:grid-cols-2'>
            <Skeleton height={355} width={320} borderRadius={12} />
            <Skeleton height={355} width={320} borderRadius={12} />
          </div>
        </div>
      </main>
    </SkeletonTheme>
  )
}
