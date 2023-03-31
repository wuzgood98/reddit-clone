import { Community } from '@/atoms/communitiesAtom';
import { Post } from '@/atoms/postAtoms';
import { auth, firestore } from '@/firebase/clientApp';
import usePost from '@/hooks/usePost';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import PostItem from './PostItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostLoader from './PostLoader';
import autoAnimate from '@formkit/auto-animate';

type PostsProps = {
  communityData: Community
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth)
  const [loading, setLoading] = useState<boolean>(false)
  const parent = useRef<HTMLDivElement>(null)
  const { setPostStateValue, postStateValue, onDeletePost, onSelectPost, onVote } = usePost()

  const getPosts = async () => {
    setLoading(true)
    try {
      // get posts for this community
      const postQuery = query(
        collection(firestore, 'posts'),
        where('communityId', '==', communityData.id),
        orderBy('createdAt', 'desc')
      )

      const postDocs = await getDocs(postQuery)

      // Store in post state
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[]
      }))
      setLoading(false)
    } catch (error: any) {
      console.log('getPosts error: ', error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return (
    <>
      {
        loading
          ? (
            <div className='flex flex-col gap-2'>
              {postStateValue.posts.map((post) => (
                <PostLoader key={post.id} />
              ))
              }
            </div>
          )
          : (
            <div ref={parent} className='flex flex-col gap-2'>
              {postStateValue.posts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  userIsCreator={user?.uid === post.creatorId}
                  userVoteValue={postStateValue.postVotes.find((vote) => vote.postId === post.id)?.voteValue}
                  onVote={onVote}
                  onDeletePost={onDeletePost}
                  onSelectPost={onSelectPost}
                />
              ))}
            </div>
          )
      }
    </>
  )
}
export default Posts;