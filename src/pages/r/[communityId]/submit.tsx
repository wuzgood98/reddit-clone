import About from "@/components/Community/About";
import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Posts/NewPostForm";
import { auth } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type submitProps = {};

const SubmitPostPage: React.FC<submitProps> = () => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();

  return (
    <PageContent>
      <>
        <div className="w-full border-b border-b-white pb-5 mb-3">
          <h1 className="text-lg font-medium flex-1 text-gray-700">
            Create a post
          </h1>
        </div>

        {user && <NewPostForm user={user} communityImageURL={communityStateValue.currentCommunity?.imageURL} />}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};
export default SubmitPostPage;
