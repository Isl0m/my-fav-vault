import { UserService } from '@/schemas/user-service.schema'

import { InputOptionItem } from './InputOptionItem'

type Props = {
  data: UserService[]
  handleSelectItem: (item: UserService) => void
}

export function InputOption({ data, handleSelectItem }: Props) {
  return (
    <ul className='mt-2 overflow-hidden rounded-lg'>
      {data.map(item => (
        <InputOptionItem
          key={item.serviceId}
          title={item.title}
          subTitle={item.subTitle}
          handleMouseDown={() => handleSelectItem(item)}
          imageSrc={item.previewImage}
        />
      ))}
    </ul>
  )
}
