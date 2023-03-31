import { communityState } from '@/atoms/communitiesAtom';
import About from '@/components/Community/About';
import PageContent from '@/components/Layout/PageContent';
import NewPostForm from '@/components/Posts/NewPostForm';
import { auth } from '@/firebase/clientApp';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';

type submitProps = {

};

const SubmitPostPage: React.FC<submitProps> = () => {
  const [user] = useAuthState(auth)
  const communityStateValue = useRecoilState(communityState)
  console.log(communityStateValue)

  return (
    <PageContent>
      <>
        <div className="w-full border-b border-b-white pb-5 mb-3">
          <h1 className="text-lg font-medium flex-1 text-gray-700">Create a post</h1>
        </div>

        {user && <NewPostForm user={user} />}
      </>
      <>
        {/* <About communityData={communityStateValue[0].currentCommunity!}/> */}
      </>
    </PageContent>
  )
}
export default SubmitPostPage;