'use client'

import { useState } from 'react'

import { Edit } from 'lucide-react'

import { ImagePreview } from '../image.preview'
import { Button } from '../ui/button'

import { UpdateProfileImageDialog } from './update.dialog'

type Props = {
  username: string
  imageSrc?: string | null
  alt: string
}

export function ProfileImage({ username, imageSrc, alt }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [imagePath, setImagePath] = useState(imageSrc)

  const updateProfileImage = (src: string) => {
    setImagePath(src)
  }

  return (
    <div className='relative'>
      <ImagePreview
        imageSrc={imagePath}
        alt={alt}
        className='aspect-square w-24'
      />
      <div className='w-full' onClick={() => setIsDialogOpen(true)}>
        <Button
          variant='secondary'
          size='sm'
          className='absolute right-2 top-2 rounded-[3px] p-2 opacity-70 backdrop-blur-md'
        >
          <Edit size={20} />
        </Button>
      </div>
      <UpdateProfileImageDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        username={username}
        updateProfileImage={updateProfileImage}
      />
    </div>
  )
}
