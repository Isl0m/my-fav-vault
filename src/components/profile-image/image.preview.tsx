import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { Button } from '@/components/buttons'
import { DivImage } from '@/components/image.preview'

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
    <Skeleton width={100} height={100} borderRadius={6} />
  )
}
