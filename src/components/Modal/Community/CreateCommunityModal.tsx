import Button from '@/components/Button';
import { auth, firestore } from '@/firebase/clientApp';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import Image from 'next/image';
import React, { ChangeEvent, SetStateAction, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import styles from '../../../styles/Global.module.css';
import { useRouter } from 'next/router';

type CreateCommunityModalProps = {
  createCommunityModalOpen: boolean
  setCreateCommunityModalOpen: (value: SetStateAction<boolean>) => void
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ createCommunityModalOpen, setCreateCommunityModalOpen }) => {
  const [user] = useAuthState(auth)
  const [communityName, setCommunityName] = useState<string>('')
  const [maxCharLength, setMaxCharLength] = useState<number>(21)
  const [communityType, setCommunityType] = useState<string>('public')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!value.length) {
      setError('')
    }
    if (value.length <= 21) {
      setCommunityName(e.target.value)
    }

    setMaxCharLength(21 - value.length)
  }

  const onCommunityTypeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e.target.value)
  }

  const closeModal = () => setCreateCommunityModalOpen(false)

  const handleCreateCommunity = async () => {
    setLoading(false)
    if (error) setError("");

    // Validate the community
    const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (regex.test(communityName) || communityName.length < 3) {
      return setError(
        "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
      );
    }

    setLoading(true)

    try {
      const communityDocRef = doc(firestore, 'communities', communityName)

      await runTransaction(firestore, async (transaction) => {
        // Check if community exists in db
        const communityDoc = await transaction.get(communityDocRef)
        if (communityDoc.exists()) {
          throw new Error(`Sorry, r/${communityName} is taken. Try another.`)
        }

        // Create community
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        })

        // Create community snippet on user
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true
          }
        )
      })
      closeModal()
      router.push(`/r/${communityName}`)
    } catch (err: any) {
      console.log('Handle create community error: ', err)
      setError(err.message)
    }
    setLoading(false)
  }

  const className: { [key: string]: string } = {
    link: 'bg-redditBlue text-white hover:bg-[#1986d7] border border-redditBlue',
    btn: 'bg-transparent border border-redditBlue text-redditBlue gap-1 hover:bg-[#e6f2fb]',
    rest: 'capitalize rounded-full text-sm font-bold flex items-center justify-center min-w-[2rem] px-4 py-2 h-full',
  }


  return (
    <div className={`${createCommunityModalOpen ? 'opacity-100 visible z-10' : 'opacity-0 invisible -z-10'} fixed flex items-center justify-center p-5 h-full w-full bg-black/60 left-0 top-0 motion-safe:transition-all duration-200 transform motion-reduce:transition-none`}>
      <div className={`${createCommunityModalOpen ? 'scale-100' : 'scale-90'} relative bg-white max-w-[35rem] w-full rounded-lg motion-safe:transition-all duration-200 transform motion-reduce:transition-none overflow-hidden`}>
        <Button onClick={() => setCreateCommunityModalOpen(false)} classNames='close-btn absolute top-4 right-4'>
          <svg xmlns="http://www.w3.org/2000/svg" className='close-btn [height:inherit] [width:inherit]' width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#878a93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </Button>

        <h1 className='font-semibold mb-5 text-sm pb-4 border-b border-redditBorder px-5 pt-5'>Create a community</h1>
        <div className='space-y-1 px-5'>
          <h2 className='font-semibold text-sm'>Name</h2>
          <p className="text-gray-400 text-xs">Community names including capitalization cannot be changed.</p>
        </div>

        <div className='mb-5 flex flex-col gap-2 px-5'>
          <span className='text-base text-gray-400 relative top-[2.07rem] left-[0.8125rem] h-4 w-max pointer-events-none'>r/</span>
          <label htmlFor="communityName" className='sr-only'>community name</label>
          <input onChange={handleChange} value={communityName} id='communityName' maxLength={21} type="text" required className='w-full py-2 pl-6 pr-3 border border-redditBorder rounded-sm outline-none focus:border-redditBlue hover:border-redditBlue motion-safe:transition-colors motion-reduce:transition-none' />
          <p className={`${maxCharLength === 0 ? 'text-red-400' : 'text-gray-400'} text-xs motion-safe:transition-colors motion-reduce:transition-none`}>{maxCharLength} Characters remaining</p>
          {(!communityName || error) && <p className='text-red-400 text-xs'>{error || 'A community name is required'}</p>}
        </div>

        <fieldset className='mb-5 flex flex-col px-5'>
          <legend className='sr-only'>Community type</legend>
          <legend className='font-semibold text-sm mb-3'>Community type</legend>
          <div className='flex flex-col self-start gap-2'>
            <label htmlFor="public-community" className='flex items-center gap-3 cursor-pointer'>
              <div className={`h-4 w-4 ${communityType === 'public' ? 'bg-redditBlue border-redditBlue' : 'bg-transparent border-gray-300'} shrink-0 border rounded-sm grid place-content-center cursor-pointer transition-colors duration-200`}>
                <Image src='/images/icon-checkmark.svg' alt="checkmark" width={12} height={9} priority className={`${communityType === 'public' ? 'animate-spring-bounce visible' : 'invisible'}`} />
              </div>
              <input
                value='public'
                id='public-community'
                checked={communityType === 'public' ? true : false}
                onChange={onCommunityTypeChecked}
                type="checkbox"
                name='public'
                className='h-5 w-5 hidden'
                aria-labelledby="public-community"
                aria-describedby="public-community"
              />
              <BsFillPersonFill className='text-gray-400' />
              <div className="flex items-center gap-2">
                <span className='text-sm font-medium capitalize'>public</span>
                <span className='text-xs text-gray-400'>Anyone can view, post, and comment to this community</span>
              </div>
            </label>
            <label htmlFor="restricted-community" className='flex items-center gap-3 cursor-pointer'>
              <div className={`h-4 w-4 ${communityType === 'restricted' ? 'bg-redditBlue border-redditBlue' : 'bg-transparent border-gray-300'} shrink-0 border rounded-sm grid place-content-center cursor-pointer transition-colors duration-200`}>
                <Image src='/images/icon-checkmark.svg' alt="checkmark" width={12} height={9} priority className={`${communityType === 'restricted' ? 'animate-spring-bounce visible' : 'invisible'}`} />
              </div>
              <input
                value='restricted'
                id='restricted-community'
                checked={communityType === 'restricted' ? true : false}
                onChange={onCommunityTypeChecked}
                type="checkbox"
                name='restricted'
                className='h-5 w-5 hidden'
                aria-labelledby="restricted-community"
                aria-describedby="restricted-community"
              />
              <BsFillEyeFill className='text-gray-400' />
              <div className="flex items-center gap-2">
                <span className='text-sm font-medium capitalize'>restricted</span>
                <span className='text-xs text-gray-400'>Anyone can view this community, but only approved users can post</span>
              </div>
            </label>
            <label htmlFor="private-community" className='flex items-center gap-3 cursor-pointer'>
              <div className={`h-4 w-4 ${communityType === 'private' ? 'bg-redditBlue border-redditBlue' : 'bg-transparent border-gray-300'} shrink-0 border rounded-sm grid place-content-center cursor-pointer transition-colors duration-200`}>
                <Image src='/images/icon-checkmark.svg' alt="checkmark" width={12} height={9} priority className={`${communityType === 'private' ? 'animate-spring-bounce visible' : 'invisible'}`} />
              </div>
              <input
                value='private'
                id='private-community'
                checked={communityType === 'private' ? true : false}
                onChange={onCommunityTypeChecked}
                type="checkbox"
                name='private'
                className='h-5 w-5 hidden'
                aria-labelledby="private-community"
                aria-describedby="private-community"
              />
              <HiLockClosed className='text-gray-400' />
              <div className="flex items-center gap-2">
                <span className='text-sm font-medium capitalize'>private</span>
                <span className='text-xs text-gray-400'>Only approved users can view and submit to this community</span>
              </div>
            </label>
          </div>
        </fieldset>

        <div className='flex items-center justify-end gap-3 bg-gray-100 p-4'>
          <Button onClick={closeModal} classNames={`${className.btn} ${className.rest}`}>cancel</Button>
          <Button onClick={handleCreateCommunity} classNames={`${className.link} ${className.rest} min-w-max`}>
            {loading
              ? <div className={styles.spinner} />
              : 'create community'
            }
          </Button>
        </div>
      </div>
    </div>
  )
}
export default CreateCommunityModal;

/* Names cannot have spaces (e.g., "r/bookclub" not "r/book club"), must be between 3-21 characters, and underscores ("_") are the only special characters allowed. Avoid using solely trademarked names (e.g., "r/FansOfAcme" not "r/Acme"). */