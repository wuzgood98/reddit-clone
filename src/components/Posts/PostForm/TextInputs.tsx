import Spinner from '@/components/Global/Spinner';
import React, { ChangeEvent, useEffect, useRef } from 'react';
import { TextInputType } from '../NewPostForm';

type TextInputsProps = {
  textInput: TextInputType;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  createPost: () => void
  loading: boolean
};

const TextInputs: React.FC<TextInputsProps> = ({ textInput, handleChange, createPost, loading }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [inputRef])

  return (
    <>
      <input ref={inputRef} type="text" onChange={handleChange} value={textInput.title} aria-label='Give your Post a title' className='border border-gray-200 rounded-[0.3125rem] px-4 py-2 text-gray-600 placeholder-gray-300 text-sm font-medium placeholder:text-sm placeholder:font-light outline-none hover:border-redditBlue motion-safe:transition-colors motion-reduce:transition-none focus:border-redditBlue' placeholder='Title' name='title' />
      <textarea name="body" onChange={handleChange} value={textInput.body} id="text" cols={30} rows={4} placeholder='Text (optional)' className='placeholder-gray-300 placeholder:text-sm placeholder:font-light text-sm font-medium text-gray-600 border border-gray-200 rounded-[0.3125rem] px-4 py-2 outline-none hover:border-redditBlue focus:border-redditBlue motion-safe:transition-colors motion-reduce:transition-none' />
      <button type='button' onClick={createPost} aria-label='Create post' className={`${!textInput.title ? 'pointer-events-none bg-blue-300 border-blue-300' : 'pointer-events-auto border-redditBlue bg-redditBlue hover:bg-[#1986d7]'} self-end text-white rounded-full text-sm font-bold flex items-center justify-center max-w-[5rem] max-h-[2rem] px-3 w-full h-full border capitalize motion-safe:transition-colors motion-reduce:transition-none`}>
        {loading
          ? <Spinner />
          : 'post'
        }
      </button>
    </>
  )
}
export default TextInputs;