import { auth, firestore } from '@/firebase/clientApp';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import styles from '../../../styles/Global.module.css';
import { User } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);
  //const [signInWithApple, appleUser, isLoading, userError] = useSignInWithApple(auth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid)
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)))
  }

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user)
    }
  }, [userCred])

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <button onClick={() => signInWithGoogle()} className={`${loading ? 'bg-redditOrange pointer-events-none' : 'bg-transparent'} w-full rounded-full flex justify-between items-center text-sm text-[#3c4043] border border-redditBorder p-3 hover:bg-[#f8fbfe] hover:border-[#d2e3fc] motion-safe:transition motion-reduce:transition-none`}>
        {loading
          ? <div className={styles.spinner} />
          : (
            <>
              <Image src='/images/googlelogo.png' alt='google logo' className='h-5 w-5' height={2048} width={2048} priority />
              <span className='mx-auto'>Continue with Google</span>
            </>
          )
        }
      </button>
      {error && (
        <p className="text-red-600 text-sm self-start">
          {error.message}
        </p>
      )}
    </div>
  )
}
export default OAuthButtons;

/* <button onClick={() => signInWithApple()} className={`${loading ? 'bg-redditOrange pointer-events-none' : 'bg-transparent'} w-full rounded-full flex justify-between items-center text-sm text-[#3c4043] border border-redditBorder p-3 hover:bg-[#f8fbfe] hover:border-[#d2e3fc] motion-safe:transition motion-reduce:transition-none`}>
        {loading
          ? <div className={styles.spinner} />
          : (
            <>
              <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
              <span className='mx-auto'>Continue with Apple</span>
            </>
          )
        }
      </button> */