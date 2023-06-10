'use client'

import { memo } from 'react'

import Image from 'next/image'

import { cn } from '@/lib/utils'

type ImagePreviewProps = {
  imageSrc?: string | null
  alt?: string
  className?: string
}
export function ImagePreview({ imageSrc, alt, className }: ImagePreviewProps) {
  return (
    <>
      {imageSrc && alt ? (
        <div
          className={cn(
            'relative aspect-[3/4] w-16 overflow-hidden rounded-md',
            className
          )}
        >
          <Image
            src={imageSrc}
            fill
            style={{ objectFit: 'cover' }}
            sizes='100px, 100px'
            alt={alt}
          />
        </div>
      ) : (
        <div
          className={cn(
            'aspect-[3/4] w-16 rounded-md border-2 border-dashed border-slate-200 bg-slate-300',
            className
          )}
        />
      )}
    </>
  )
}

export const ImagePreviewMemo = memo(ImagePreview)
