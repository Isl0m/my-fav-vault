import { PropsWithChildren } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@ui/card'

import { UserService } from '@/schemas/user-service.schema'

import { ImageOrBlank } from './image-preview'

type UserFavProps = PropsWithChildren & {
  title: string
  data: UserService[]
}

export function UserFav({ title, data }: UserFavProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className='flex flex-col gap-4'>
          {data.map(item => (
            <UserFavItem
              key={item.id}
              title={item.title}
              subTitle={item.subTitle}
              imageSrc={item.previewImage}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
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
        <ImageOrBlank className='shrink-0' imageSrc={imageSrc} alt={title} />
        <div>
          <h4 className='line-clamp-1 font-semibold'>{title}</h4>
          <p className='line-clamp-1 text-sm text-slate-400'>{subTitle}</p>
        </div>
      </div>
    </li>
  )
}
