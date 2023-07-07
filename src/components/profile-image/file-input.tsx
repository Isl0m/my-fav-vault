import { ChangeEvent, DragEvent, useCallback } from 'react'

import { Upload } from 'lucide-react'

export function FileInputArea({
  onFileChange,
}: {
  onFileChange: (file: File) => void
}) {
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (files && files.length > 0) {
      onFileChange(files[0])
    }
  }
  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const { files } = e.dataTransfer

    if (files && files.length > 0) {
      onFileChange(files[0])
    }
  }

  const handleDrag = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  return (
    <label
      htmlFor='dropzone-file'
      className='flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100'
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <div className='flex flex-col items-center justify-center pb-6 pt-5'>
        <Upload className='mb-3' size={30} />
        <p className='mb-2 text-sm text-slate-500'>
          <span className='font-semibold'>Click to upload</span> or drag and
          drop
        </p>
        <p className='text-xs text-slate-500'>PNG or JPG (MAX. 3MB)</p>
      </div>
      <input
        id='dropzone-file'
        onChange={handleChangeInput}
        type='file'
        className='hidden'
        accept='image/png, image/jpeg, image/jpg'
      />
    </label>
  )
}
