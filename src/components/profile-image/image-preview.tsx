import { Skeleton } from '@ui/skeleton'

import { Button } from '@/components/ui/button'

import { Image } from '../image-preview'

type Props = {
  imageSrc: string | undefined
  handleResetImage: () => void
}

export function UploadedImagePreview({ imageSrc, handleResetImage }: Props) {
  return imageSrc ? (
    <div>
      <Image
        className='aspect-square w-24'
        src={imageSrc}
        alt={'Uploaded image'}
      />
      <Button
        variant='secondary'
        onClick={handleResetImage}
        className='mt-2 w-24'
      >
        Change
      </Button>
    </div>
  ) : (
    <div className='flex flex-col'>
      <Skeleton className='h-24 w-24 rounded-md' />
      <Skeleton className='mt-2 h-10 w-24 rounded-md' />
    </div>
  )
}
