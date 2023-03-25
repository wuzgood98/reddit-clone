import { authModalState } from '@/atoms/authModalAtom';
import Button from '@/components/Button';
import React from 'react';
import { useSetRecoilState } from 'recoil';

const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState)

  const handleClick = (view: 'login' | 'signup' | 'resetPassword') => {
    setAuthModalState({
      open: true, view
    })
  }


  const className: { [key: string]: string } = {
    link: 'bg-redditBlue text-white hover:bg-[#1986d7]',
    btn: 'bg-transparent border border-redditBlue text-redditBlue gap-1 hover:bg-[#e6f2fb]',
    rest: 'lg:w-[7.5rem] capitalize rounded-full text-sm font-bold flex items-center justify-center min-w-[2rem] px-4 h-full',
  }

  return (
    <div className="hidden gap-4 sm:flex h-full">
      <Button onClick={() => handleClick('signup')} classNames={`${className.btn} ${className.rest}`}>
        Sign Up
        <span className="sr-only">Sign Up</span>
      </Button>
      <Button onClick={() => handleClick('login')} classNames={`${className.link} ${className.rest}`}>
        log in
        <span className="sr-only">Log in</span>
      </Button>
    </div>
  )
}
export default AuthButtons;