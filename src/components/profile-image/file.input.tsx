import { ChangeEvent } from 'react'
import { BsUpload } from 'react-icons/bs'

export function FileInputArea({ handleFileChange }: {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label
      htmlFor='dropzone-file'
      className='dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center
              rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100
              dark:border-slate-600 dark:bg-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-600'
    >
      <div className='flex flex-col items-center justify-center pb-6 pt-5'>
        <BsUpload className='mb-3' size={30} />
        <p className='mb-2 text-sm text-slate-500 dark:text-slate-400'>
          <span className='font-semibold'>Click to upload</span> or drag and
          drop
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
  )
}