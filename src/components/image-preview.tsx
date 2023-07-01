'use client'

import Image, { ImageProps } from 'next/image'

import { ComponentProps, memo } from 'react'

import { cn } from '@/lib/utils'

type ImagePreviewProps = ComponentProps<'div'> & {
  imageSrc?: string | null
  alt?: string
  className?: string
}
export function ImagePreview({
  imageSrc,
  alt,
  className,
  ...rest
}: ImagePreviewProps) {
  return (
    <>
      {imageSrc && alt ? (
        <DivImage src={imageSrc} alt={alt} className={className} />
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

type DivImageProps = ImageProps & {
  className?: string
}
export function DivImage({ className, alt, ...rest }: DivImageProps) {
  return (
    <div
      className={cn(
        'relative aspect-[3/4] w-16 overflow-hidden rounded-md',
        className
      )}
    >
      <Image
        {...rest}
        fill
        style={{ objectFit: 'cover' }}
        sizes='100px, 100px'
        alt={alt}
      />
    </div>
  )
}

export const ImagePreviewMemo = memo(ImagePreview)
