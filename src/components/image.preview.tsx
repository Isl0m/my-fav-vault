'use client'

import { ComponentProps, memo } from 'react'

import Image from 'next/image'

import { cn } from '@/lib/utils'

type ImagePreviewProps = ComponentProps<'div'> & {
  imageSrc?: string | null
  alt?: string
  className?: string
}
export function ImagePreview({ imageSrc, alt, className , ...rest}: ImagePreviewProps) {
  return (
    <>
      {imageSrc && alt ? (
        <DivImage imageSrc={imageSrc} alt={alt} className={className} />
      ) : (
        <div
          className={cn(
            'aspect-[3/4] w-16 rounded-md border-2 border-dashed border-slate-200 bg-slate-300',
            className
          )}
            {...rest}
        />
      )}
    </>
  )
}

type DivImageProps = ComponentProps<'div'> & {
  imageSrc: string
  alt: string
  className?: string
}
export function DivImage({className, imageSrc, alt, ...rest}: DivImageProps)  {
  return <div
      className={cn(
          'relative aspect-[3/4] w-16 overflow-hidden rounded-md',
          className
      )}
      {...rest}
  >
    <Image
        src={imageSrc}
        fill
        style={{ objectFit: 'cover' }}
        sizes='100px, 100px'
        alt={alt}
    />
  </div>
}

export const ImagePreviewMemo = memo(ImagePreview)
