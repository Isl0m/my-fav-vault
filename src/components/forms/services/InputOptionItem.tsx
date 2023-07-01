import { ImagePreviewMemo } from '@/components/image-preview'

type Props = {
  title: string
  subTitle?: string | null
  handleMouseDown: () => void
  imageSrc?: string | null
}
export function InputOptionItem({
  title,
  subTitle,
  handleMouseDown,
  imageSrc,
}: Props) {
  return (
    <li
      className='flex cursor-pointer items-center gap-4 bg-slate-200 p-2 hover:bg-slate-300'
      onMouseDown={handleMouseDown}
    >
      <ImagePreviewMemo imageSrc={imageSrc} alt={title} />

      <div>
        <h5 className='font-medium'>{title}</h5>
        <p className='text-sm'>{subTitle} </p>
      </div>
    </li>
  )
}
