'use client'

import { useState } from 'react'
import { FiEdit } from 'react-icons/fi'

import { Button } from '../buttons'
import { ImagePreview } from '../image.preview'

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
          isSquare
          variant='secondary'
          size='sm'
          className='absolute right-2 top-2 rounded-[3px] opacity-70'
        >
          <FiEdit />
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
