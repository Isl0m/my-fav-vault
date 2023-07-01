import { DivImage } from '@/components/image-preview'
import { Button } from '@/components/ui/button'

import { Skeleton } from '../ui/skeleton'

type Props = {
  imagePath: string | undefined
  handleChangeImage: () => void
}

export function UploadedImagePreview({ imagePath, handleChangeImage }: Props) {
  return !!imagePath ? (
    <div>
      <DivImage
        className='aspect-square w-24'
        src={imagePath}
        alt={'Uploaded image'}
      />
      <Button variant='secondary' onClick={handleChangeImage} className='mt-2'>
        Change
      </Button>
    </div>
  ) : (
    <Skeleton className='h-24 w-24 rounded-md' />
  )
}
