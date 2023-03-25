import { authModalState } from '@/atoms/authModalAtom';
import Button from '@/components/Button';
import { auth } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/erros';
import autoAnimate from '@formkit/auto-animate';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import styles from '../../../styles/Global.module.css';

type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
  const [modalState, setModalState] = useRecoilState(authModalState)

  const changeViewState = (view: 'login' | 'signup' | 'resetPassword') => {
    setModalState((prev) => ({ ...prev, view }))
  }

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  const parent = useRef(null)

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signInWithEmailAndPassword(loginForm.email, loginForm.password)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginForm(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])


  return (
    <form ref={parent} onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-3 w-full">
      <fieldset className='relative w-full'>
        {/* <label htmlFor="email" className='text-[#737577] text-sm font-medium'>Username</label> */}
        <input type="email" value={loginForm.email} onChange={handleChange} name="email" id="email" required placeholder='Email' className='text-sm font-medium rounded-full h-11 w-full bg-[#f6f7f8] p-3 border border-transparent hover:[border-color:rgba(0,0,0,.2)] motion-safe:transition-colors motion-reduce:transition-none outline-none focus:[border-color:rgba(0,0,0,.2)]' />
      </fieldset>

      <fieldset className='relative w-full'>
        {/* <label htmlFor="password" className='text-[#737577] text-sm font-medium'>Password</label> */}
        <input type="password" value={loginForm.password} onChange={handleChange} name="password" id="password" required placeholder='password' className='text-sm font-medium rounded-full h-11 w-full bg-[#f6f7f8] p-3 border border-transparent hover:[border-color:rgba(0,0,0,.2)] motion-safe:transition-colors motion-reduce:transition-none outline-none focus:[border-color:rgba(0,0,0,.2)]' />
      </fieldset>

      {error && (
        <p className="text-red-600 text-sm self-start">
          {FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS]}
        </p>
      )}

      <p className='text-xs self-start my-3'>Forget your <Button onClick={() => changeViewState("resetPassword")} ariaLabel='Reset password' classNames='text-redditBlue'>password</Button>?</p>

      <Button submit classNames='w-full bg-redditOrange hover:bg-[#ff5019] text-white text-sm rounded-full p-3 font-medium'>
        {loading
          ? <div className={styles.spinner} />
          : 'Log in'
        }
      </Button>
    </form>
  )
}
export default Login;

/* <input type="text" name="username" id="username" required placeholder='Username' className='text-sm font-medium rounded-full h-11 w-full bg-[#f6f7f8] p-3 border border-transparent hover:[border-color:rgba(0,0,0,.2)] motion-safe:transition-colors motion-reduce:transition-none outline-none focus:[border-color:rgba(0,0,0,.2)]' /> */