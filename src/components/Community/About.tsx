import { Community, communityState } from '@/atoms/communitiesAtom';
import { auth, firestore, storage } from '@/firebase/clientApp';
import useSelectFile from '@/hooks/useSelectFile';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import moment from 'moment';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaReddit } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import UseImage from '../Global/Image';
import Spinner from '../Global/Spinner';

type AboutProps = {
  communityData: Community
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const [user] = useAuthState(auth)
  const selectedFileRef = useRef<HTMLInputElement>(null)
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile()
  const [uploadingImage, setUploadingImage] = useState<boolean>(false)
  const setCommunityStateValue = useSetRecoilState(communityState)

  const openFilesWindow = () => selectedFileRef.current?.click()

  const updateImage = async () => {
    if (!selectedFile) return;
    setUploadingImage(true)
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`)
      await uploadString(imageRef, selectedFile, 'data_url')
      const downloadURL = await getDownloadURL(imageRef)
      await updateDoc(doc(firestore, 'communities', communityData.id), {
        imageURL: downloadURL
      })
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL
        } as Community
      }))
      setUploadingImage(false)
      setSelectedFile('')
    } catch (error: any) {
      console.log('updateImage error: ', error)
      setUploadingImage(false)
    }
  }

  return (
    <div className='sticky top-4'>
      <div className="flex flex-col w-full overflow-hidden rounded-[0.25rem]">
        <div className="px-4 py-3 bg-redditOrange text-white w-full">
          <h2 className="text-sm font-bold capitalize">about community</h2>
        </div>
        <div className="flex flex-col p-3 bg-white gap-3">
          <div className="flex gap-1 border-b border-gray-200 pb-4">
            <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7f8183" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"></path><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"></path><path d="M2 21h20"></path><path d="M7 8v2"></path><path d="M12 8v2"></path><path d="M17 8v2"></path><path d="M7 4h.01"></path><path d="M12 4h.01"></path><path d="M17 4h.01"></path></svg>
            {
              communityData.createdAt && (
                <span className="capitalize text-sm font-normal text-gray-500">
                  {`created ${moment(new Date(communityData.createdAt.seconds * 1000)).format('MMM DD, YYYY')}`}
                </span>
              )
            }
          </div>
          <div className="flex w-full text-gray-800 capitalize text-sm border-b border-gray-200 pb-4">
            <div className="flex flex-col grow">
              <p>{communityData.numberOfMembers.toLocaleString('en-US')}</p>
              <p className='font-light text-gray-500 text-xs'>members</p>
            </div>
            <div className="flex flex-col grow">
              <p>1</p>
              <p className='font-light text-gray-500 text-xs'>online</p>
            </div>
          </div>
          <Link href={`/r/${communityData.id}/submit`} aria-label='Create post' className='w-full text-center bg-redditOrange hover:bg-[#ff5019] text-white text-sm rounded-full p-2 font-medium capitalize'>
            create post
          </Link>
          {
            user?.uid === communityData.creatorId && (
              <div className='border-t border-gray-200 pt-4 flex flex-col gap-1 text-xs capitalize'>
                <p>admin</p>
                <div className="flex items-center justify-between w-full">
                  <button onClick={openFilesWindow} type='button' aria-label='Change community image' className='text-redditOrange capitalize hover:underline underline-offset-2'>change image</button>
                  <input
                    ref={selectedFileRef}
                    accept="image/png,image/gif,image/jpeg,image/webp,video/mp4,video/quicktime"
                    onChange={onSelectFile}
                    type="file"
                    name="file"
                    id="file"
                    aria-label='Add file'
                    className='hidden'
                  />

                  {
                    communityData.imageURL || selectedFile
                      ? (
                        <UseImage imageURL={selectedFile || communityData.imageURL!} className='rounded-full inline-block w-10 h-10' alt='Community image' />
                      )
                      : (
                        <FaReddit className='h-10 w-10 inline-block rounded-full' />
                      )
                  }
                </div>
                {
                  selectedFile && (
                    <button onClick={updateImage} type='button' aria-label='Save image changes' className='text-redditOrange capitalize hover:underline underline-offset-2'>
                      {
                        uploadingImage
                          ? <Spinner color='#878a93' />
                          : 'save changes'
                      }
                    </button>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
export default About;