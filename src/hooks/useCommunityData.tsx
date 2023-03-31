import { authModalState } from '@/atoms/authModalAtom';
import { Community, CommunitySnippet, communityState } from '@/atoms/communitiesAtom';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, doc, getDocs, increment, writeBatch } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';

const useCommunityData = () => {
  const [user] = useAuthState(auth)
  const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState)
  const setAuthModalState = useSetRecoilState(authModalState)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
    // if not open auth modal
    if (!user) {
      setAuthModalState({ open: true, view: "login" })
      return;
    }

    // is the user signed in
    if (isJoined) {
      leaveCommunity(communityData.id)
      return;
    }

    joinCommunity(communityData)
  }

  const getMySnippets = async () => {
    setLoading(true)
    try {
      // get user snippets
      const snippetDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`))

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }))
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }))
      setLoading(false)
    } catch (error: any) {
      console.log('getMySnippets error: ', error)
      setError(error.message)
    }
  }

  useEffect(() => {
    if (!user) return;
    getMySnippets()
  }, [user])

  const joinCommunity = async (communityData: Community) => {
    console.log('JOINING COMMUNITY: ', communityData.id)
    // batch write
    // creating a new community snippet
    // updating the numberOfMembers (1)

    try {
      const batch = writeBatch(firestore)

      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      }

      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      )

      batch.update(doc(firestore, 'communities', communityData.id), {
        numberOfMembers: increment(1)
      })

      await batch.commit()

      // update recoil state - communityState.mySnippets by appending the new data
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet]
      }))
    } catch (error: any) {
      console.log('getMySnippets error: ', error)
      setError(error.message)
    }
    setLoading(false)
  }

  const leaveCommunity = async (communityId: string) => {
    // batch write

    try {
      const batch = writeBatch(firestore)

      // deleting the new community snippet from user
      batch.delete(doc(firestore, `users/${user?.uid}/communitiesSnippets`, communityId))

      // updating the numberOfMember (-1)
      batch.update(doc(firestore, 'communities', communityId), {
        numberOfMembers: increment(-1)
      })

      await batch.commit()

      // update recoil state - communityState.mySnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter((item) => item.communityId !== communityId)
      }))
    } catch (error: any) {
      console.log('laeveCommunity error: ', error.message)
      setError(error.message)
    }
    setLoading(false)
  }

  return {
    loading,
    communityStateValue,
    onJoinOrLeaveCommunity,
  }
}
export default useCommunityData;