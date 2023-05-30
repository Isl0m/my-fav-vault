'use client'

import { FC, memo } from 'react'

import Image from 'next/image'

type ImagePreviewProps = {
  imageSrc?: string | null
  alt?: string
}
export const InputImagePreview: FC<ImagePreviewProps> = ({ imageSrc, alt }) => {
  return (
    <>
      {imageSrc && alt ? (
        <div className='relative mr-3 aspect-[3/4] h-16 overflow-hidden rounded-md'>
          <Image
            src={imageSrc}
            fill
            style={{ objectFit: 'cover' }}
            sizes='100px, 100px'
            alt={alt}
          />
        </div>
      ) : (
        <div className='mr-3 h-16 w-12 rounded-md border-2 border-dashed border-slate-200 bg-slate-300' />
      )}
    </>
  )
}

export const InputImagePreviewMemo = memo(InputImagePreview)
