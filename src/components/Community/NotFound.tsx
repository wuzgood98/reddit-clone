import Link from 'next/link';
import React from 'react';

const NotFound: React.FC = () => {

  const className: { [key: string]: string } = {
    link: 'bg-redditBlue text-white hover:bg-[#1986d7] uppercase border border-redditBlue tracking-wider',
    btn: 'bg-transparent border border-redditBlue text-redditBlue gap-1 hover:bg-[#e6f2fb] capitalize font-bold',
    rest: 'rounded-full text-sm font-bold flex items-center justify-center min-w-[2rem] px-4 py-2 h-full',
  }

  return (
    <div className='min-h-[calc(100vh-3rem)] w-full flex flex-col items-center justify-center bg-redditLightBlue'>
      <div className='flex items-center justify-center flex-col gap-6 text-center'>
        <div className="bg-[#a8a8a8] rounded-full h-[6.25rem] w-[6.25rem] mx-auto" />
        <h1 className='text-lg font-medium text-gray-900'>
          Sorry, there aren’t any communities on Reddit with that name.
        </h1>
        <p className='text-sm text-gray-900 font-medium'>
          This community may have been banned or the community name is incorrect.
        </p>

        <Link href='/' tabIndex={0} aria-label='Go home' className={`${className.link} ${className.rest} mt-6`}>go home</Link>
        {/* <div className="flex items-center justify-center gap-2 mt-6">
          <button type='button' tabIndex={0} className={`${className.btn} ${className.rest}`}>create community</button>
        </div> */}
      </div>
    </div>
  )
}
export default NotFound;