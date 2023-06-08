import { PropsWithChildren } from 'react'

import { ImagePreview } from '@/components/image.preview'
import { UserService } from '@/schemas/user-service.schema'

type UserFavProps = PropsWithChildren & {
  title: string
  data: UserService[]
}

export function UserFav({ title, data }: UserFavProps) {
  return (
    <div>
      <h2 className='mb-2 text-lg font-bold'>{title}</h2>
      <ul className='flex flex-col gap-4 rounded-xl bg-slate-200 p-4'>
        {data.map(item => (
          <UserFavItem
            key={item.id}
            title={item.title}
            subTitle={item.subTitle}
            imageSrc={item.previewImage}
          />
        ))}
      </ul>
    </div>
  )
}

type UserFavItemProps = {
  title: string
  subTitle: string | null
  imageSrc: string | null
}

function UserFavItem({ title, subTitle, imageSrc }: UserFavItemProps) {
  return (
    <li className='max-w-sm'>
      <div className='flex items-center gap-4'>
        <ImagePreview className='shrink-0' imageSrc={imageSrc} alt={title} />
        <div>
          <h4 className='line-clamp-1 font-semibold'>{title}</h4>
          <p className='line-clamp-1 text-sm text-slate-400'>{subTitle}</p>
        </div>
      </div>
    </li>
  )
}
