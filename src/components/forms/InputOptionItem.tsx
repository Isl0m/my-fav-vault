import { FC } from 'react'

import { ImagePreviewMemo } from '../ImagePreview'

type Props = {
  title: string
  subTitle: string
  handleMouseDown: () => void
  imageSrc?: string | null
}
export const InputOptionItem: FC<Props> = ({
  title,
  subTitle,
  handleMouseDown,
  imageSrc,
}) => {
  return (
    <li
      className='flex cursor-pointer items-center gap-4 bg-slate-200 p-2 hover:bg-slate-300'
      onMouseDown={handleMouseDown}
    >
      <ImagePreviewMemo className='shrink-0' imageSrc={imageSrc} alt={title} />

      <div>
        <h5 className='font-medium'>{title}</h5>
        <p className='text-sm'>{subTitle} </p>
      </div>
    </li>
  )
}
