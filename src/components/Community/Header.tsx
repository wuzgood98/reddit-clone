import { Community } from '@/atoms/communitiesAtom';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaReddit } from 'react-icons/fa'

type HeaderProps = {
  communityData: Community
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const isJoined = false

  useEffect(() => {
    const img = document.createElement("img");
    img.src = communityData.imageURL as typeof img.src;
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
    };
  }, [communityData.imageURL]);

  return (
    <div className='flex flex-col w-full h-[10rem]'>
      <div className="h-[45%] bg-redditBlue" />
      <div className="justify-center bg-white grow px-4">
        <div className="flex items-center gap-3 w-[95%] max-w-[60rem] mx-auto relative -top-4">
          {communityData.imageURL
            ? (
              <Image src={communityData.imageURL} alt={`${communityData.id} avatar`} height={dimensions.height} width={dimensions.width} priority className='h-[5rem] w-[5rem] inline-block rounded-full border-[0.25rem] border-white bg-cover bg-white' />
            )
            :
            (
              <FaReddit className='h-[5rem] w-[5rem] inline-block rounded-full border-[0.25rem] border-white bg-cover bg-white' />
            )
          }

          <div className="flex items-center gap-4 mt-6">
            <div className="flex flex-col">
              <h1 className='text-gray-900 inline-block text-[1.75rem] leading-8 truncate pb-1 w-full font-bold'>{communityData.id}</h1>
              <h2 className='text-gray-400 text-sm font-medium'>r/{communityData.id}</h2>
            </div>
            <div className="flex items-center gap-3 self-start">
              <div className='w-24'>
                <button className={`${isJoined ? "bg-transparent group hover:bg-[#e6f2fb] text-redditBlue" : "bg-redditBlue hover:bg-[#1986d7] text-white"} rounded-full text-sm font-bold flex items-center justify-center min-w-[2rem] min-h-[2rem] px-4 py-1 w-full h-full border border-redditBlue gap-1 capitalize motion-safe:transition-colors motion-reduce:transition-none`}>
                  {
                    isJoined
                      ? (
                        <>
                          <span className='block group-hover:hidden'>joined</span>
                          <span className='hidden group-hover:block'>leave</span>
                        </>
                      )
                      : 'join'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Header;