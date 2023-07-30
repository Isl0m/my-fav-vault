import { Suspense } from 'react'

import { Button } from '@ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ui/sheet'

import {
  SimilarProfilesList,
  SimilarProfilesLoading,
  SimilarProfilesProps,
} from './profiles-list'

export function SimilarProfilesSheet(props: SimilarProfilesProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='secondary'>Similar Profiles</Button>
      </SheetTrigger>
      <SheetContent className='w-full p-4 md:p-6'>
        <SheetHeader>
          <SheetTitle className='text-2xl font-semibold tracking-tight'>
            Similar Profiles
          </SheetTitle>
        </SheetHeader>
        <Suspense fallback={<SimilarProfilesLoading />}>
          {/* @ts-expect-error Async Server Component */}
          <SimilarProfilesList {...props} />
        </Suspense>
      </SheetContent>
    </Sheet>
  )
}
