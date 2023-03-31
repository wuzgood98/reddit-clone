import Spinner from '@/components/Global/Spinner';
import autoAnimate from '@formkit/auto-animate';
import React, { ChangeEvent, useEffect, useRef } from 'react';
import UseImage from '../../Global/Image';

type ImageUploadProps = {
  loading: boolean
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void
  selectedFile?: string
  setSelectedFile: (value: string) => void
  setSelectedTab: (value: string) => void
};

const ImageUpload: React.FC<ImageUploadProps> = ({ loading, onSelectFile, selectedFile, setSelectedFile, setSelectedTab }) => {
  const selectedFileRef = useRef<HTMLInputElement>(null)
  const parent = useRef(null)

  const backToPostTab = () => setSelectedTab("post")

  const removeFile = () => setSelectedFile("")

  const openFilesWindow = () => selectedFileRef.current?.click()

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return (
    <div ref={parent} className="flex flex-col justify-center items-center w-full min-h-[13rem]">
      {
        !selectedFile
          ? (
            <div className="flex justify-center items-center border border-gray-200 border-dashed w-full h-full rounded-[0.3125rem] p-4">
              <button type='button' onClick={openFilesWindow} aria-label='Upload file' className={`pointer-events-auto bg-transparent border border-redditBlue text-redditBlue gap-1 ${!loading && 'hover:bg-[#e6f2fb]'} rounded-full text-sm font-bold flex items-center justify-center max-w-[5rem] max-h-[2rem] px-3 w-full h-full capitalize motion-safe:transition-all motion-reduce:transition-none active:scale-95`}>
                {loading
                  ? <Spinner color='#878a93' />
                  : 'upload'
                }
              </button>
              <input
                ref={selectedFileRef}
                accept="image/png,image/gif,image/jpeg,image/webp,video/mp4,video/quicktime"
                onChange={onSelectFile}
                multiple
                type="file"
                name="file"
                id="file"
                aria-label='Add file'
                className='hidden'
              />
            </div>
          )
          : (
            <>
              <UseImage
                imageURL={selectedFile}
                className='rounded-[0.3125rem] w-full max-w-[20rem] max-h-[20rem] object-cover'
                alt=''
              />
              <div className="flex items-center gap-2 mt-4">
                <button onClick={backToPostTab} type='button' aria-label='Back to post tab' className="border border-redditBlue bg-redditBlue text-white gap-1 hover:bg-[#1986d7] rounded-full text-xs font-bold flex items-center justify-center max-w-max h-[1.625rem] px-3 py-1 w-full capitalize motion-safe:transition-colors motion-reduce:transition-none">
                  Back to Post
                </button>
                <button onClick={removeFile} type='button' aria-label='Remove file' className="border border-redditBlue bg-redditBlue text-white gap-1 hover:bg-[#1986d7] rounded-full text-xs font-bold flex items-center justify-center max-w-max h-[1.625rem] px-3 py-1 w-full capitalize motion-safe:transition-colors motion-reduce:transition-none">
                  remove
                </button>
              </div>
            </>
          )
      }
    </div>
  )
}
export default ImageUpload;