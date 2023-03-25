import Button from '@/components/Button';
import React, { useState } from 'react';
import { BsArrowUpRightCircle, BsChatDots } from 'react-icons/bs';
import { GrAdd } from 'react-icons/gr';
import { IoFilterCircleOutline, IoNotificationsOutline, IoVideocamOutline } from 'react-icons/io5';

type IconsProps = {

};

const Icons: React.FC<IconsProps> = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => setMenuOpen(prev => !prev)

  return (
    <div className="flex items-center gap-4 border-r pr-4 mr-1 border-gray-200">
      <div className="hidden md:flex items-center gap-4">
        <Button classNames='text-redditIcon w-5 h-5'>
          <BsArrowUpRightCircle className='h-full w-full' />
        </Button>
        <Button classNames='text-redditIcon w-[1.43rem] h-[1.43rem]'>
          <IoFilterCircleOutline className='h-full w-full' />
        </Button>
        <Button classNames='text-redditIcon w-5 h-5'>
          <IoVideocamOutline className='h-full w-full' />
        </Button>
      </div>
      <Button classNames='text-redditIcon w-5 h-5'>
        <BsChatDots className='h-full w-full' />
      </Button>
      <Button classNames='text-redditIcon w-5 h-5'>
        <IoNotificationsOutline className='h-full w-full' />
      </Button>
      <Button classNames='text-redditIcon w-5 h-5 hidden md:block'>
        <GrAdd className='h-full w-full' />
      </Button>
    </div>
  )
}
export default Icons;