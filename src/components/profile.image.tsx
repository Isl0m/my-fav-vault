'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ChangeEvent, useState } from 'react'
import { BsUpload } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'

import { getAvatarUrl, uploadFile } from '@/lib/supabase'

import { Button } from './buttons'
import { DivImage, ImagePreview } from './image.preview'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import { UserService } from '@/schemas/user-service.schema'
import { ImageUpdateRequest } from '@/schemas/user-image.schema'

type ProfileImageProps = {
  username: string
  imageSrc?: string | null
  alt?: string
}

export function ProfileImage({ username, ...image }: ProfileImageProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleMouseOver = () => {
    setIsHovering(true)
  }

  const handleMouseOut = () => {
    setIsHovering(false)
  }
  return (
    <div
      className='relative'
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <ImagePreview {...image} className='aspect-square w-24' />
      {isHovering && (
        <div className='w-full' onClick={() => setIsDialogOpen(true)}>
          <Button
            variant='secondary'
            size='sm'
            className='absolute bottom-0 left-[28px] rounded-xl py-3'
          >
            <BsUpload />
          </Button>
        </div>
      )}
      <UpdateProfileImageDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        username={username}
      />
    </div>
  )
}

function UpdateProfileImageDialog({
                                    username,
                                    ...dialog
                                  }: Required<
  Pick<Dialog.DialogProps, 'open' | 'onOpenChange'> &
  Pick<ProfileImageProps, 'username'>
>) {
  const [imagePath, setImagePath] = useState<string>()
  const [file, setFile] = useState<File>()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const maxAllowedSize = 3 * 1024 * 1024

    if (file.size < maxAllowedSize) {
      setFile(file)
      uploadFile(file,username).then(res =>{
        if(!res.error) {
          setImagePath(getAvatarUrl(res.data?.path))
          return
        }
        toast.error(res.error?.message)
        setFile(undefined)
      })
      return
    }
    toast.error('Image size must be less than 3 MB')
  }

  const handleUpdateImage = () => {
    if(!imagePath) return
    const payload: ImageUpdateRequest = { image: imagePath, username }
    fetch('/api/user', {
      method: "POST",
      body: JSON.stringify(payload)
    }).then(res => {
      if(res.ok) dialog.onOpenChange(false)
    })
  }

  return (
    <Dialog.Root {...dialog}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-slate-500/30 data-[state=open]:animate-overlayShow' />
        <Dialog.Content
          className='fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow'>
          <Dialog.Title className='m-0 text-2xl font-semibold'>
            Upload Profile Image
          </Dialog.Title>

          <div className='mt-5 flex w-full items-center justify-center'>
            {!!file
              ? <UploadedImagePreview imagePath={imagePath} />
              : <FileInputArea handleFileChange={handleFileChange} />
            }
          </div>

          <div className='mt-6 flex justify-end'>
              <Button disabled={!imagePath} onClick={handleUpdateImage}>Save changes</Button>
          </div>
          <Dialog.Close asChild>
            <Button
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

function FileInputArea({ handleFileChange }: { handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
  return <label
    htmlFor='dropzone-file'
    className='dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center
              rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100
              dark:border-slate-600 dark:bg-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-600'
  >
    <div className='flex flex-col items-center justify-center pb-6 pt-5'>
      <BsUpload className='mb-3' size={30} />
      <p className='mb-2 text-sm text-slate-500 dark:text-slate-400'>
        <span className='font-semibold'>Click to upload</span> or drag
        and drop
      </p>
      <p className='text-xs text-slate-500 dark:text-slate-400'>
        PNG or JPG (MAX. 3MB)
      </p>
    </div>
    <input
      id='dropzone-file'
      onChange={handleFileChange}
      type='file'
      className='hidden'
      accept='image/png, image/jpeg'
    />
  </label>
}

function UploadedImagePreview({ imagePath }: { imagePath: string | undefined }) {
  return (!!imagePath ?
      (<DivImage imageSrc={imagePath} alt={'Uploaded image'} />) :
      (<Skeleton width={100} height={100} borderRadius={6} />)
  )
}