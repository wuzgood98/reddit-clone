import { authModalState } from '@/atoms/authModalAtom';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { TiHome } from 'react-icons/ti'
import Communities from './Communities';
import CreateCommunityModal from '@/components/Modal/Community/CreateCommunityModal';

const Directory: React.FC = () => {
  const [createCommunityModalOpen, setCreateCommunityModalOpen] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const setAuthModalState = useSetRecoilState(authModalState)

  const handleClick = (view: 'login' | 'signup' | 'resetPassword') => {
    setAuthModalState({
      open: true, view
    })
  }

  const closeMenu = () => {
    setCreateCommunityModalOpen(true)
    setMenuOpen(false)
  }

  const toggleMenu = () => setMenuOpen(prev => !prev)

  return (
    <div className="flex items-center justify-center w-auto lg:w-[16.875rem] mr-2">
      <div className={`relative text-left inline-block group w-full`}>
        <span className="rounded-md w-full">
          <button type='button' aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117" onClick={toggleMenu} className='inline-flex w-full justify-between items-center gap-1 ml-2 p-1 group transition duration-150 ease-in-out bg-white border border-transparent hover:border-gray-300 rounded-md  focus:outline-none focus:border-gray-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800'>
            <span className="flex items-center gap-1">
              <TiHome className='h-5 w-5' />
              <span className='capitalize text-sm mt-1 hidden lg:block'>{'home'}</span>
            </span>

            <span className="sr-only">{'Home'}</span>
            <svg className={`${menuOpen ? '-rotate-180' : 'rotate-0'} h-4 w-4 motion-safe:transition motion-reduce:transition-none duration-300`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#878a93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </span>

        <div className={`${menuOpen ? 'opacity-100 translate-y-0 scale-100 visible' : 'opacity-0 invisible -translate-y-2 scale-95'} transition-all duration-300 transform origin-top-left`}>
          <ul className="absolute right-0 left-2 w-56 lg:w-full mt-2 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none overflow-hidden" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">

            <Communities closeMenu={closeMenu} />
          </ul>
        </div>

        <CreateCommunityModal
          createCommunityModalOpen={createCommunityModalOpen}
          setCreateCommunityModalOpen={setCreateCommunityModalOpen}
        />
      </div>
    </div>
  )
}
export default Directory;