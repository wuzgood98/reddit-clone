import { authModalState } from '@/atoms/authModalAtom';
import { Post, PostVote, postState } from '@/atoms/postAtoms';
import { auth, firestore, storage } from '@/firebase/clientApp';
import { collection, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { MouseEvent } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';

const usePost = () => {
  const [user] = useAuthState(auth)
  const [postStateValue, setPostStateValue] = useRecoilState(postState)
  const setAuthModalState = useSetRecoilState(authModalState)

  const onVote = async (post: Post, vote: number, communityId: string) => {
    if (!user?.uid) {
      setAuthModalState({ open: true, view: 'login' })
      return;
    }

    const { voteStatus } = post
    const existingVote = postStateValue.postVotes.find((vote) => vote.postId === post.id)

    try {
      const batch = writeBatch(firestore)
      const updatedPost = { ...post }
      let updatedPosts = [...postStateValue.posts]
      let updatedPostVotes = [...postStateValue.postVotes]
      let voteChange = vote

      // new vote
      if (!existingVote) {
        // create a new postVote document
        const postVoteRef = doc(
          collection(firestore, 'users', `${user?.uid}/postVotes`)
        )

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id,
          communityId,
          voteValue: vote
        }

        batch.set(postVoteRef, newVote)

        // add/subtract 1 from post.voteStatus
        updatedPost.voteStatus = voteStatus + vote
        updatedPostVotes = [...updatedPostVotes, newVote]
      }
      // existing vote - they have voted on the post before 
      else {
        const postVoteRef = doc(
          firestore,
          'users',
          `${user?.uid}/postVotes/${existingVote.id}`
        )

        // Removing their votes (up => neutral OR down => neutral)
        if (existingVote.voteValue === vote) {
          // add/subtract 1 from post.voteStatus
          voteChange *= -1
          updatedPost.voteStatus = voteStatus - vote
          updatedPostVotes = updatedPostVotes.filter((vote) => vote.id !== existingVote.id)
          // delete the postVote document
          batch.delete(postVoteRef)
        }
        // flipping their vote (up => down OR down => up)
        else {
          // add/subtract 2 from post.voteStatus
          voteChange = 2 * vote
          updatedPost.voteStatus = voteStatus + 2 * vote

          const voteIndex = postStateValue.postVotes.findIndex((vote) => vote.id === existingVote.id)
          if (voteIndex !== -1) {
            updatedPostVotes[voteIndex] = {
              ...existingVote,
              voteValue: vote,
            }
          }
          // updating the existing postValue document
          batch.update(postVoteRef, {
            voteValue: vote,
          })

        }
      }
      // update our post document
      const postRef = doc(firestore, 'posts', post.id)
      batch.update(postRef, { voteStatus: voteStatus + voteChange })


      // update state with updated values
      const postIndex = postStateValue.posts.findIndex((item) => item.id === post.id)
      updatedPosts[postIndex] = updatedPost
      setPostStateValue((prev) => ({
        ...prev,
        posts: updatedPosts,
        postVotes: updatedPostVotes
      }))
      await batch.commit()
    } catch (error) {
      console.log('onVote error: ', error)
    }
  }

  const onSelectPost = () => { }

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      // check if image, delete if exists
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`)
        await deleteObject(imageRef)
      }
      // delete post document from firestore
      const postRef = doc(firestore, 'posts', post.id)
      await deleteDoc(postRef)

      // update recoil state
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id)
      }))
      return true
    } catch (error: any) {
      console.log('onDeletePost error: ', error.message)
      return false
    }
  }

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost
  }
}
export default usePost;