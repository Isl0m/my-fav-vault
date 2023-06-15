import * as Dialog from '@radix-ui/react-dialog'
import { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { FaTimes } from 'react-icons/fa'

import { useSession } from 'next-auth/react'

import {
  deleteFiles,
  deleteUnusedFile,
  getAvatarUrl,
  listOfFiles,
  uploadFile,
} from '@/lib/supabase'
import { ImageUpdateRequest } from '@/schemas/user-image.schema'

import { Button } from '../buttons'

import { FileInputArea } from './file.input'
import { UploadedImagePreview } from './image.preview'

type Props = Required<
  Pick<Dialog.DialogProps, 'open' | 'onOpenChange'> & {
    username: string
    updateProfileImage: (src: string) => void
  }
>

export function UpdateProfileImageDialog({
  username,
  updateProfileImage,
  ...dialog
}: Props) {
  const [imagePath, setImagePath] = useState<string>()
  const [file, setFile] = useState<File>()
  const { update } = useSession()

  const handleChangeImage = () => {
    setImagePath(undefined)
    setFile(undefined)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const maxAllowedSize = 3 * 1024 * 1024

    if (file.size < maxAllowedSize) {
      setFile(file)
      uploadFile(file, username).then(res => {
        if (!res.error) {
          const imagePath = getAvatarUrl(res.data?.path)
          setImagePath(imagePath)
          return
        }
        toast.error(res.error?.message)
        setFile(undefined)
      })
      return
    }
    toast.error('Image size must be less than 3 MB')
  }

  const handleUpdateImage = async () => {
    if (!imagePath) return
    const toastId = toast.loading('Updating image...')
    const payload: ImageUpdateRequest = {
      image: imagePath,
      username,
    }
    const updateImage = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    if (!updateImage.ok) {
      toast.dismiss(toastId)
      return
    }
    await update({ picture: imagePath })
    updateProfileImage(imagePath)
    dialog.onOpenChange(false)
    toast.dismiss(toastId)

    await deleteUnusedFile(username)
  }

  return (
    <Dialog.Root {...dialog}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-slate-500/30 data-[state=open]:animate-overlayShow' />
        <Dialog.Content className='fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow'>
          <Dialog.Title className='m-0 text-2xl font-semibold'>
            Upload Profile Image
          </Dialog.Title>

          <div className='mt-5 flex w-full items-center justify-center'>
            {!!file ? (
              <UploadedImagePreview
                imagePath={imagePath}
                handleChangeImage={handleChangeImage}
              />
            ) : (
              <FileInputArea handleFileChange={handleFileChange} />
            )}
          </div>

          <div className='mt-6 flex justify-end'>
            <Button disabled={!imagePath} onClick={handleUpdateImage}>
              Save changes
            </Button>
          </div>
          <Dialog.Close asChild>
            <Button
              isSquare
              variant='secondary'
              className='absolute right-2 top-2 bg-transparent'
            >
              <FaTimes />
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
