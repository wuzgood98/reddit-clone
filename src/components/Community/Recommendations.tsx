import { Community } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UseImage from "../Global/Image";
import { FaReddit } from "react-icons/fa";
import Spinner from "../Global/Spinner";

const Recommendations: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunityRecommendations = async () => {
    setLoading(true);
    try {
      const communitiesQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );
      const communitiesDocsRef = await getDocs(communitiesQuery);
      const communities = communitiesDocsRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communities as Community[]);
    } catch (error) {
      console.log("getCommunityRecommendations error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <div className="flex flex-col bg-white rounded-[0.25rem] border border-gray-300 overflow-hidden">
      <div className="flex items-end text-white py-[0.375rem] px-[0.625rem] font-bold capitalize bg-[linear-gradient(to_bottom,_rgba(0,0,0,0),_rgba(0,0,0,0.75)),url('/images/recCommsArt.png')] bg-cover h-[4.375rem]">
        <span>top communities</span>
      </div>
      <ul className="flex flex-col" role="menu">
        {loading ? (
          <div className="flex flex-col p-3 mt-2 gap-2 w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-4 w-3/5">
                <div className="h-4 w-1 rounded-[0.25rem] bg-gray-300 animate-pulse" />
                <div className="flex items-center gap-1 grow">
                  <div className="h-4 w-4 rounded-full bg-gray-300 shrink-0 animate-pulse" />
                  <div className="h-4 w-full rounded-[0.25rem] bg-gray-300 animate-pulse" />
                </div>
              </div>
              <div className="h-4 w-16 rounded-full bg-gray-300 animate-pulse" />
            </div>
          </div>
        ) : (
          <>
            {communities.map((community, index) => {
              const isJoined = !!communityStateValue.mySnippets.find(
                (snippet) => snippet.communityId === community.id
              );

              return (
                <li key={community.id} role="menuitem">
                  <div className="flex items-center w-full justify-between text-xs border-b border-gray-200 py-[0.625rem] px-3">
                    <div className="flex items-center">
                      <div className="flex gap-2 items-center">
                        <span className="font-medium w-4">{index + 1}</span>
                        <Link
                          href={`/r/${community.id}`}
                          aria-label={`r/${community.id}`}
                          className="flex items-center gap-2"
                        >
                          {community.imageURL ? (
                            <UseImage
                              imageURL={community.imageURL}
                              className="h-5 w-5 rounded-full"
                              alt={`r/${community.id} community avatar`}
                            />
                          ) : (
                            <FaReddit className="h-5 w-5" />
                          )}
                          <span className="font-medium truncate">{`r/${community.id}`}</span>
                        </Link>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onJoinOrLeaveCommunity(community, isJoined)
                      }
                      className={`${
                        isJoined
                          ? "bg-transparent group hover:bg-[#e6f2fb] text-redditBlue"
                          : "bg-redditBlue hover:bg-[#1986d7] text-white"
                      } rounded-full text-sm font-bold flex items-center justify-center w-20 min-h-[1rem] px-4 h-full border border-redditBlue gap-1 capitalize motion-safe:transition-colors motion-reduce:transition-none`}
                    >
                      {isJoined ? (
                        <>
                          {loading ? (
                            <Spinner />
                          ) : (
                            <>
                              <span className="block group-hover:hidden">
                                joined
                              </span>
                              <span className="hidden group-hover:block">
                                leave
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        <>{loading ? <Spinner /> : "join"}</>
                      )}
                    </button>
                  </div>
                </li>
              );
            })}
            <div className="py-[0.625rem] px-5">
              <button
                type="button"
                aria-disabled="true"
                aria-label="View all communities"
                className="w-full h-8 pointer-events-none bg-redditBlue hover:bg-[#1986d7] text-white capitalize text-sm font-bold rounded-full"
              >
                view all
              </button>
            </div>
          </>
        )}
      </ul>
    </div>
  );
};
export default Recommendations;
