import { Community } from '@/atoms/communitiesAtom';
import Header from '@/components/Community/Header';
import NotFound from '@/components/Community/NotFound';
import PageContent from '@/components/Layout/PageContent';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify'

type CommunityPageProps = {
  communityData: Community
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) {
    return <NotFound />
  }

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <><div>LHS</div></>
        <><div>rHS</div></>
      </PageContent>
    </>
  )

}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get community data pass it to client
  try {
    const communityDocRef = doc(
      firestore,
      'communities',
      context.query.communityId as string
    )

    const communityDoc = await getDoc(communityDocRef)

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
            safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
          )
          : ''
      }
    };
  } catch (error) {
    // could add error page here
    console.log('getServerSideProps error: ', error)
  }
}

export default CommunityPage;
