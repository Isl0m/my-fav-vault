import { useSession } from 'next-auth/react'

import { useState } from 'react'
import toast from 'react-hot-toast'

import { DialogProps } from '@radix-ui/react-dialog'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { SUPABASE } from '@/lib/supabase'
import { ImageUpdateRequest } from '@/schemas/user-image.schema'

import { Icons } from '../icons'
import { Button } from '../ui/button'

import { FileInputArea } from './file-input'
import { UploadedImagePreview } from './image-preview'

async function updateUserImage(payload: ImageUpdateRequest) {
  return await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

type Props = Required<
  Pick<DialogProps, 'open' | 'onOpenChange'> & {
    username: string
    // updateProfileImage: (src: string) => void
  }
>

export function UpdateProfileImageDialog({
  username,
  // updateProfileImage,
  ...dialog
}: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [imagePath, setImagePath] = useState<string>()
  const [file, setFile] = useState<File>()
  const { update } = useSession()

  const handleChangeImage = () => {
    setImagePath(undefined)
    setFile(undefined)
  }

  const uploadFile = async (file: File) => {
    const maxAllowedSize = 3 * 1024 * 1024

    if (file.size > maxAllowedSize) {
      toast.error('Image size must be less than 3 MB')
      return
    }

    setFile(file)
    const res = await SUPABASE.uploadFile(file, username)

    if (!res.error) {
      const imagePath = SUPABASE.getAvatarUrl(res.data?.path)
      setImagePath(imagePath)
      return
    }

    toast.error(res.error?.message)
    setFile(undefined)
    return
  }

  const handleUpdateImage = async () => {
    if (!imagePath) return
    setIsLoading(true)

    const updateImage = await updateUserImage({ image: imagePath, username })

    if (!updateImage.ok) return
    await update({ image: imagePath })

    // updateProfileImage(imagePath)
    dialog.onOpenChange(false)

    await SUPABASE.deleteUnusedFile(username)
    setIsLoading(false)
  }

  return (
    <Dialog {...dialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Profile Image</DialogTitle>
        </DialogHeader>

        <div className='mt-5 flex w-full items-center justify-center'>
          {!!file ? (
            <UploadedImagePreview
              imagePath={imagePath}
              handleChangeImage={handleChangeImage}
            />
          ) : (
            <FileInputArea onFileChange={uploadFile} />
          )}
        </div>

        <DialogFooter>
          <Button
            disabled={!imagePath || isLoading}
            onClick={handleUpdateImage}
          >
            {isLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
