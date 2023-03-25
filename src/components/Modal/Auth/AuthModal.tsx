import { authModalState } from '@/atoms/authModalAtom';
import Button from '@/components/Button';
import Image from 'next/image';
import React, { MouseEventHandler, useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState)
  const [user, loading, error] = useAuthState(auth);

  const changeViewState = (view: 'login' | 'signup' | 'resetPassword') => {
    setModalState((prev) => ({ ...prev, view }))
  }

  const closeModal: MouseEventHandler = (e) => {
    const target = e.target as HTMLElement
    if (target.classList.contains('bg-black/40') || target.classList.contains('close-btn')) {
      setModalState((prevState) => ({ ...prevState, open: false }))
    }
  }

  const handleClose = useCallback(() => {
    setModalState((prevState) => ({ ...prevState, open: false }))
  }, [setModalState])

  useEffect(() => {
    if (user) handleClose();
    console.log('User: ', user)
  }, [handleClose, user])

  return (
    <div onClick={closeModal} className={`${modalState.open ? 'opacity-100 visible z-10' : 'opacity-0 invisible -z-10'} fixed p-5 h-full w-full bg-black/40 left-0 top-0 flex items-center justify-center motion-safe:transition-all duration-200 transform motion-reduce:transition-none`}>
      <div className={`${modalState.open ? 'scale-100' : 'scale-90'} relative bg-white max-w-[25rem] w-full rounded-lg min-h-[20rem] px-8 py-12 md:px-14 md:py-16 motion-safe:transition-all duration-200 transform motion-reduce:transition-none`}>
        <Button onClick={closeModal} classNames='close-btn absolute top-4 right-4'>
          <svg xmlns="http://www.w3.org/2000/svg" className='close-btn [height:inherit] [width:inherit]' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#878a93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </Button>

        <div className='flex max-w-[20rem] flex-col gap-2 my-auto mx-auto'>
          {modalState.view === 'resetPassword' && (
            <Image src='/images/redditFace.svg' alt='reddit face logo' className='h-8 w-8' height={2500} width={2500} priority />
          )}
          <h1 className='text-lg font-semibold'>
            {modalState.view === 'login' && 'Log In'}
            {modalState.view === 'signup' && 'Sign Up'}
            {modalState.view === 'resetPassword' && 'Update your password'}
          </h1>

          <div className='space-y-8'>
            {
              modalState.view !== "resetPassword" && (
                <p className='text-xs'>
                  By continuing, you agree are setting up a Reddit account and agree to our {" "}
                  <Button link href="#" ariaLabel='Read more about User Agreement' classNames='text-redditBlue'>User Agreement</Button> and {" "}
                  <Button link href="#" ariaLabel='Read more about Privacy Policy' classNames='text-redditBlue'>Privacy Policy</Button>.
                </p>
              )
            }

            <div className='space-y-8'>
              {modalState.view !== "resetPassword" && (
                <>
                  <OAuthButtons />
                  <div className="flex space-between gap-3 items-center">
                    <span className="w-full border-t border-redditBorder"></span>
                    <span className="font-bold text-sm uppercase text-[#787c7e]">or</span>
                    <span className="w-full border-t border-redditBorder"></span>
                  </div>
                </>
              )}

              <AuthInputs />

              <p className='text-xs'>
                {modalState.view === "login" && 'New to Reddit?'} {" "}
                {modalState.view === "login" && <Button onClick={() => changeViewState("signup")} ariaLabel='Sign Up' classNames='text-redditBlue capitalize font-bold'>sign up</Button>}
                {modalState.view === "signup" && 'Already a redditor?'} {" "}
                {modalState.view === "signup" && <Button onClick={() => changeViewState("login")} ariaLabel='Log In' classNames='text-redditBlue capitalize font-bold'>log in</Button>}
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
export default AuthModal;