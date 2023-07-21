'use client'

import NextImage, { ImageProps as NextImageProps } from 'next/image'

import { ComponentProps, memo } from 'react'

import { cn } from '@/lib/utils'

type ImageOrBlankProps = ComponentProps<'div'> & {
  imageSrc?: string | null
  alt?: string
  className?: string
}
export function ImageOrBlank({
  imageSrc,
  alt,
  className,
  ...rest
}: ImageOrBlankProps) {
  return (
    <>
      {imageSrc && alt ? (
        <Image src={imageSrc} alt={alt} className={className} />
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

type ImageProps = NextImageProps & {
  className?: string
}
export function Image({ className, alt, ...rest }: ImageProps) {
  return (
    <div
      className={cn(
        'relative aspect-[3/4] w-16 overflow-hidden rounded-md',
        className
      )}
    >
      <NextImage
        {...rest}
        fill
        style={{ objectFit: 'cover' }}
        sizes='100px, 100px'
        alt={alt}
      />
    </div>
  )
}

export const ImageOrBlankMemo = memo(ImageOrBlank)
