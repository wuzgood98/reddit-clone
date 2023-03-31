import { Post } from '@/atoms/postAtoms';
import { firestore, storage } from '@/firebase/clientApp';
import autoAnimate from '@formkit/auto-animate';
import { User } from 'firebase/auth';
import { Timestamp, addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import PostError from './PostError';
import ImageUpload from './PostForm/ImageUpload';
import TextInputs from './PostForm/TextInputs';
import TabItem from './TabItem';
import useSelectFile from '@/hooks/useSelectFile';


type NewPostFormProps = {
  user: User
};

export type TabItemType = {
  title: string;
  icon: IconType
}

export type TextInputType = {
  title: string;
  body: string;
}

const tabs: TabItemType[] = [
  {
    icon: IoDocumentText,
    title: 'post'
  },
  {
    icon: IoImageOutline,
    title: 'images & video'
  },
  {
    icon: BsLink45Deg,
    title: 'link'
  },
  {
    icon: BiPoll,
    title: 'poll'
  },
  {
    icon: BsMic,
    title: 'talk'
  }
]

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].title)
  const [textInput, setTextInput] = useState<TextInputType>({
    title: '',
    body: ''
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const parent = useRef(null)
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile()


  const selectTab = (tab: string) => setSelectedTab(tab)

  const createPost = async () => {
    setLoading(true)
    setError(false)
    const { communityId } = router.query
    const { title, body } = textInput
    // create new post object => type Post
    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user.uid,
      authorDisplayName: user.email!.split('@')[0],
      title,
      body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp
    }

    try {
      // store the post in the db
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost)

      // check for selectedFile
      if (selectedFile) {
        // store in storage => getDownloadURL (return imageURL)
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`)
        await uploadString(imageRef, selectedFile, 'data_url')
        const downloadURL = await getDownloadURL(imageRef)
        // update post doc by adding imageURL
        await updateDoc(postDocRef, {
          imageURL: downloadURL
        })
        setLoading(false)
        setError(false)
      }
      // redirect the user back to the communityPage using the router
      router.back()
      setLoading(false)
    } catch (error: any) {
      console.log('createPostError: ', error)
      setError(true)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target
    setTextInput((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return (
    <div ref={parent} className="flex flex-col bg-white rounded-[0.3125rem] overflow-hidden">
      <div className="flex w-full">
        {
          tabs.map((tab, tabIndex) => {
            return (
              <TabItem
                key={tabIndex}
                item={tab}
                selectTab={selectTab}
                selectedTab={selectedTab}
              />
            )
          })
        }
      </div>

      <div ref={parent} className="flex flex-col p-4 gap-3">
        {
          selectedTab === 'post' && (
            <TextInputs
              handleChange={handleChange}
              textInput={textInput}
              createPost={createPost}
              loading={loading}
            />
          )
        }
        {
          selectedTab === 'images & video' && (
            <ImageUpload
              loading={loading}
              onSelectFile={onSelectFile}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setSelectedTab={setSelectedTab}
            />
          )
        }
      </div>
      {
        error && (
          <PostError />
        )
      }
    </div>
  )
}
export default NewPostForm;