import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/clientApp';
import { signOut, User } from 'firebase/auth';
import Image from 'next/image';
import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { IoSparkles } from 'react-icons/io5';
import { MdOutlineLogin } from 'react-icons/md';
import { useSetRecoilState } from 'recoil';

type UserMenuProps = {
  user?: User | null
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const setAuthModalState = useSetRecoilState(authModalState)

  const handleClick = (view: 'login' | 'signup' | 'resetPassword') => {
    setAuthModalState({
      open: true, view
    })
    setMenuOpen(false)
  }

  const toggleMenu = () => setMenuOpen(prev => !prev)

  const closeMenuAndLogOut = () => {
    setMenuOpen(false)
    signOut(auth)
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`relative text-left inline-block group`}>
        <span className="rounded-md">
          <button type='button' aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117" onClick={toggleMenu} className='inline-flex items-center gap-1 ml-2 p-1 group transition duration-150 ease-in-out bg-white border border-transparent hover:border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-gray-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800'>
            {
              user
                ? (
                  <>
                    <div className='relative h-6 w-6 max-h-6 max-w-6'>
                      <div className='absolute bottom-0 left-0'>
                        <Image src='/images/profileIcon_headshot.png' alt='reddit face logo' className='block scale-[1.3] origin-[bottom_center]' height={256} width={256} priority />
                      </div>
                    </div>
                    <div className="hidden flex-col xl:flex mr-6">
                      <p className='text-xs text-left'>{user?.displayName || user?.email?.split('@')[0]}</p>
                      <div className="flex gap-1">
                        <IoSparkles className='h-3 w-3 text-redditOrange' />
                        <p className='text-gray-400 text-xs'>1 karma</p>
                      </div>
                    </div>
                  </>
                )
                : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#878a93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                )
            }

            <span className="sr-only">User account menu</span>
            <svg className={`${menuOpen ? '-rotate-180' : 'rotate-0'} h-4 w-4 motion-safe:transition motion-reduce:transition-none duration-300`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#878a93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </span>

        <div className={`${menuOpen ? 'opacity-100 translate-y-0 scale-100 visible' : 'opacity-0 invisible -translate-y-2 scale-95'} transition-all duration-300 transform origin-top-right`}>
          <ul className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none overflow-hidden" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
            {user ? (
              <>
                <li role="menuitem" className="px-4 py-3 block lg:hidden">
                  <p className="text-sm leading-5">Signed in as</p>
                  <p className="text-sm font-medium leading-5 text-gray-500 truncate">{user?.email}</p>
                </li>
                <li role="menuitem" className="">
                  <button tabIndex={0} onClick={() => setMenuOpen(false)} className="text-gray-700 flex items-center gap-2 w-full px-4 py-2 text-sm leading-5 text-left hover:bg-redditBlue hover:text-white motion-safe:transition-colors motion-reduce:transition-none overflow-hidden" role="menuitem">
                    <CgProfile />
                    <span className='capitalize'>profile</span>
                  </button>
                </li>
                <li role="menuitem" className="">
                  <button tabIndex={3} onClick={closeMenuAndLogOut} aria-label='Sign out' className='text-gray-700 flex items-center gap-2 w-full px-4 py-2 text-sm leading-5 text-left hover:bg-redditBlue hover:text-white motion-safe:transition-colors motion-reduce:transition-none overflow-hidden' role="menuitem">
                    <MdOutlineLogin />
                    <span className='capitalize'>log out</span>
                  </button>
                </li>
              </>
            ) : (
              <li role="menuitem" className="">
                <button tabIndex={3} aria-label='Sign out' className='text-gray-700 flex items-center gap-2 w-full px-4 py-2 text-sm leading-5 text-left hover:bg-redditBlue hover:text-white motion-safe:transition-colors motion-reduce:transition-none overflow-hidden' role="menuitem" onClick={() => handleClick("login")}>
                  <MdOutlineLogin />
                  <span className='capitalize'>log in / sign up</span>
                </button>
              </li>
            )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}
export default UserMenu;