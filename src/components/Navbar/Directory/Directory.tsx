import { communityState } from "@/atoms/communitiesAtom";
import UseImage from "@/components/Global/Image";
import CreateCommunityModal from "@/components/Modal/Community/CreateCommunityModal";
import useDirectory from "@/hooks/useDirectory";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { FaReddit } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { useRecoilValue } from "recoil";
import Communities from "./Communities";
import MenuListItem from "./MenuListItem";

const Directory: React.FC = () => {
  const mySnippets = useRecoilValue(communityState).mySnippets;
  const { directoryState, toggleMenuOpen } = useDirectory();

  return (
    <div className="flex items-center justify-center w-auto lg:w-[16.875rem] mr-2">
      <div className="relative text-left inline-block group w-full z-[6]">
        <span className="rounded-md w-full">
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={directoryState.isOpen}
            aria-controls="headlessui-menu-items-117"
            onClick={toggleMenuOpen}
            className="inline-flex w-full justify-between items-center gap-1 ml-2 p-1 group transition duration-150 ease-in-out bg-white border border-transparent hover:border-gray-300 rounded-md  focus:outline-none focus:border-gray-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
          >
            <span className="flex items-center gap-2">
              {directoryState.selectedMenuItem.imageURL ? (
                <UseImage
                  imageURL={directoryState.selectedMenuItem.imageURL}
                  className="h-5 w-5 rounded-full"
                  alt={`${directoryState.selectedMenuItem.route} community avatar`}
                />
              ) : directoryState.selectedMenuItem.route === "/" ? (
                <TiHome className="h-5 w-5" />
              ) : (
                <FaReddit className="h-5 w-5" />
              )}
              <span className="text-sm font-medium mt-1 hidden lg:block">
                {directoryState.selectedMenuItem.route === "/"
                  ? directoryState.selectedMenuItem.communityName
                  : `r/${directoryState.selectedMenuItem.communityName}`}
              </span>
            </span>

            <span className="sr-only">
              {directoryState.selectedMenuItem.route === "/"
                ? directoryState.selectedMenuItem.communityName
                : `r/${directoryState.selectedMenuItem.communityName}`}
            </span>
            <ChevronDown
              stroke="#878a93"
              className={`${
                directoryState.isOpen ? "-rotate-180" : "rotate-0"
              } h-4 w-4 motion-safe:transition motion-reduce:transition-none duration-300`}
            />
          </button>
        </span>

        <div
          className={`${
            directoryState.isOpen
              ? "opacity-100 translate-y-0 scale-100 visible"
              : "opacity-0 invisible -translate-y-2 scale-95"
          } transition-all duration-300 transform origin-top-left`}
        >
          <ul
            className="absolute right-0 left-2 w-56 lg:w-full mt-2 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-[0.25rem] shadow-lg outline-none overflow-y-auto max-h-80"
            aria-labelledby="headlessui-menu-button-1"
            id="headlessui-menu-items-117"
            role="menu"
          >
            <h2 className="uppercase text-[0.625rem] text-gray-500 font-medium px-4 py-2">
              moderating
            </h2>
            {mySnippets
              .filter((snippet) => snippet.isModerator)
              .map((snippet) => (
                <MenuListItem
                  key={snippet.communityId}
                  route={`/r/${snippet.communityId}`}
                  communityName={snippet.communityId}
                  imageURL={snippet.imageURL}
                />
              ))}

            <Communities />

            {mySnippets.map((snippet) => (
              <MenuListItem
                key={snippet.communityId}
                route={`/r/${snippet.communityId}`}
                communityName={snippet.communityId}
                imageURL={snippet.imageURL}
              />
            ))}
          </ul>
        </div>

        <CreateCommunityModal />
      </div>
    </div>
  );
};
export default Directory;
