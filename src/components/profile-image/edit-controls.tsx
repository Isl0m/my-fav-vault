'use client'

import { useState } from 'react'

import { Edit } from 'lucide-react'

import { Button } from '../ui/button'

import { UpdateProfileImageDialog } from './update-dialog'

type Props = {
  username: string
}

export function EditControls({ username }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
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
        // updateProfileImage={updateProfileImage}
      />
    </>
  )
}
