import { FC } from 'react'

import { InputImagePreviewMemo } from './InputImagePreview'

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
      className='flex cursor-pointer items-center gap-4 bg-slate-200 p-4 hover:bg-slate-300'
      onMouseDown={handleMouseDown}
    >
      <div className='relative aspect-[3/4] h-12 overflow-hidden rounded-md'>
        <InputImagePreviewMemo imageSrc={imageSrc} alt={title} />
      </div>

      <div>
        <h5 className='font-medium'>{title.slice(0, 18)}...</h5>
        <p className='text-sm'>{subTitle.slice(0, 18)}... </p>
      </div>
    </li>
  )
}
