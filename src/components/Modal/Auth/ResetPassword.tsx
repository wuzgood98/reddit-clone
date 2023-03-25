import { authModalState } from '@/atoms/authModalAtom';
import Button from '@/components/Button';
import { auth } from '@/firebase/clientApp';
import autoAnimate from '@formkit/auto-animate';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import styles from '../../../styles/Global.module.css';


const ResetPassword: React.FC = () => {
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
    auth
  );
  const [success, setSuccess] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const parent = useRef(null)

  const [modalState, setModalState] = useRecoilState(authModalState)

  const changeViewState = (view: 'login' | 'signup' | 'resetPassword') => {
    setModalState((prev) => ({ ...prev, view }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccess(false)
    await sendPasswordResetEmail(email)
    setSuccess(true)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
  }

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return (
    <form ref={parent} onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4 w-full">
      {
        success ? <p className='text-base text-[#737577] self-start'>Check your email :)</p> : (
          <>
            <h2 className='text-[#737577] text-xs font-medium'>Enter the email associated with your account and we will send you a reset link.</h2>
            <fieldset className='relative w-full'>
              {/* <label htmlFor="email" className='text-[#737577] text-sm font-medium'>Username</label> */}
              <input type="email" value={email} onChange={handleChange} name="email" id="email" required placeholder='Email' className='text-sm font-medium rounded-full h-11 w-full bg-[#f6f7f8] p-3 border border-transparent hover:[border-color:rgba(0,0,0,.2)] motion-safe:transition-colors motion-reduce:transition-none outline-none focus:[border-color:rgba(0,0,0,.2)]' />
            </fieldset>
            <Button submit classNames='w-full bg-redditOrange hover:bg-[#ff5019] text-white text-sm rounded-full p-3 font-medium'>
              {sending
                ? <div className={styles.spinner} />
                : 'Reset Password'
              }
            </Button>
          </>
        )
      }

      <div className="flex items-center gap-3">
        <Button onClick={() => changeViewState("login")} classNames='text-redditOrange text-xs font-bold'>
          LOGIN
        </Button>
        <span className='h-1 w-1 bg-redditOrange rounded-full'></span>
        <Button onClick={() => changeViewState("signup")} classNames='text-redditOrange text-xs font-bold'>
          SIGN UP
        </Button>
      </div>


    </form>
  )
}
export default ResetPassword;