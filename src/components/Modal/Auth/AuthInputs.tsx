import { authModalState } from '@/atoms/authModalAtom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Login from './Login';
import ResetPassword from './ResetPassword';
import SignUp from './SignUp';


const AuthInputs: React.FC = () => {
  const modalState = useRecoilValue(authModalState)

  return (
    <>
      {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <SignUp />}
      {modalState.view === "resetPassword" && <ResetPassword />}
    </>
  )
}
export default AuthInputs;