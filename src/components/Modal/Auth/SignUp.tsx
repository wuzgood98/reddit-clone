import Button from '@/components/Button';
import Spinner from '@/components/Global/Spinner';
import { auth, firestore } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/erros';
import autoAnimate from '@formkit/auto-animate';
import { User } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

const SignUp: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [userError, setUserError] = useState<string>('')
  const parent = useRef(null)

  const [
    createUserWithEmailAndPassword,
    userCred,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Update form state
    const { name, value } = e.target
    setSignUpForm(prev => ({ ...prev, [name]: value }))
  }

  // Firebase logic
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userError) setUserError('')
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setUserError('Passwords do not match')
      return;
    }
    // Password match
    await createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
  }

  const createUserDocument = async (user: User) => {
    await addDoc(collection(firestore, "users"), JSON.parse(JSON.stringify(user)))
  }

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user)
    }
  }, [userCred])

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return (
    <form ref={parent} onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-3">
      <fieldset className='relative w-full'>
        {/* <label htmlFor="email" className='text-[#737577] text-sm font-medium'>Username</label> */}
        <input type="email" value={signUpForm.email} onChange={handleChange} name="email" id="email" required placeholder='Email' className='text-sm font-medium rounded-full h-11 w-full bg-[#f6f7f8] p-3 border border-transparent hover:[border-color:rgba(0,0,0,.2)] motion-safe:transition-colors motion-reduce:transition-none outline-none focus:[border-color:rgba(0,0,0,.2)]' />
      </fieldset>
      <fieldset className='relative w-full'>
        {/* <label htmlFor="email" className='text-[#737577] text-sm font-medium'>Username</label> */}
        <input type="password" value={signUpForm.password} onChange={handleChange} name="password" id="password" required placeholder='password' className='text-sm font-medium rounded-full h-11 w-full bg-[#f6f7f8] p-3 border border-transparent hover:[border-color:rgba(0,0,0,.2)] motion-safe:transition-colors motion-reduce:transition-none outline-none focus:[border-color:rgba(0,0,0,.2)]' />
      </fieldset>
      <fieldset className='relative w-full'>
        {/* <label htmlFor="email" className='text-[#737577] text-sm font-medium'>Username</label> */}
        <input type="password" value={signUpForm.confirmPassword} onChange={handleChange} name="confirmPassword" id="confirmPassword" required placeholder='confirm password' className='text-sm font-medium rounded-full h-11 w-full bg-[#f6f7f8] p-3 border border-transparent hover:[border-color:rgba(0,0,0,.2)] motion-safe:transition-colors motion-reduce:transition-none outline-none focus:[border-color:rgba(0,0,0,.2)]' />
      </fieldset>
      {
        (userError || error) && (
          <p className="text-red-600 text-sm self-start">
            {userError || FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
          </p>
        )
      }
      <Button submit classNames='w-full bg-redditOrange hover:bg-[#ff5019] text-white text-sm rounded-full p-3 font-medium'>
        {loading
          ? <Spinner />
          : 'Sign Up'
        }
      </Button>
    </form>
  )
}
export default SignUp;