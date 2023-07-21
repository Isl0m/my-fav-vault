'use client'

import { useState } from 'react'

import { Edit } from 'lucide-react'

import { Button } from '@ui/button'

import { ImageOrBlank } from '../image-preview'

import { UpdateProfileImageDialog } from './update-dialog'

type Props = {
  username: string
  imageSrc?: string | null
}

export default function ProfileImage({ username, imageSrc }: Props) {
  const [image, setImage] = useState(imageSrc)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const updateImage = (imageSrc: string) => {
    setImage(imageSrc)
  }
  const handleDialogOpen = () => setIsDialogOpen(true)

  return (
    <div className='relative'>
      <ImageOrBlank
        imageSrc={image}
        alt={username}
        className='aspect-square w-24'
      />
      <EditControls handleDialogOpen={handleDialogOpen} />
      <UpdateProfileImageDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        username={username}
        updateProfileImage={updateImage}
      />
    </div>
  )
}

type EditControlsProps = {
  handleDialogOpen: () => void
}

function EditControls({ handleDialogOpen }: EditControlsProps) {
  return (
    <div className='w-full' onClick={handleDialogOpen}>
      <Button
        variant='secondary'
        size='sm'
        className='absolute right-2 top-2 rounded-[3px] p-2 opacity-80 backdrop-blur-md'
      >
        <Edit size={20} />
      </Button>
    </div>
  )
}
