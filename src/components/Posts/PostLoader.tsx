import React from 'react';

const PostLoader: React.FC = () => {

  return (
    <div className="flex gap-2 rounded shadow-md w-full h-max bg-white">
      <div className="w-9 bg-gray-300 animate-pulse"></div>
      <div className="flex flex-col gap-2 w-full px-2 pb-2 pt-6">
        <div className="h-[0.375rem] w-1/3 rounded bg-gray-300 animate-pulse"></div>
        <div className="h-[0.375rem] w-1/2 rounded bg-gray-300 animate-pulse"></div>
        <div className="h-[0.375rem] w-4/5 rounded bg-gray-300 animate-pulse"></div>
        <div className="h-48 w-full rounded bg-gray-300 animate-pulse"></div>
        <div className="h-[0.375rem] w-1/3 rounded bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  )
}
export default PostLoader;