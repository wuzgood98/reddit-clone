import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";
import { useSetRecoilState } from "recoil";

const PersonalHome: React.FC = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const { toggleMenuOpen, openCreateCommunityModal } = useDirectory();

  const openModal = () => {
    if (!user?.uid) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    openCreateCommunityModal();
  };

  return (
    <div className="flex flex-col bg-white rounded-[0.25rem] border border-gray-300 sticky">
      <div className="flex text-white py-[0.375rem] px-[0.625rem] bg-redditBlue h-9 rounded-t-[0.25rem] bg-[url('/images/redditPersonalHome.png')] bg-cover" />
      <div className="flex flex-col p-3">
        <div className="flex items-center mb-2">
          <FaReddit className="text-[3.125rem] text-redditOrange mr-2" />
          <span className="font-semibold capitalize">home</span>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm">
            Your personal Reddit frontpage, built for you.
          </p>
          <button
            onClick={toggleMenuOpen}
            type="button"
            aria-label="Create post"
            className="w-full h-8 bg-redditBlue hover:bg-[#1986d7] text-white capitalize text-sm font-bold rounded-full"
          >
            create post
          </button>
          <button
            onClick={openModal}
            type="button"
            aria-label="Create Community"
            className="w-full h-8 bg-transparent hover:bg-[#e6f2fb] text-redditBlue capitalize text-sm font-bold rounded-full border-redditBlue border motion-safe:transition-colors motion-reduce:transition-none"
          >
            create community
          </button>
        </div>
      </div>
    </div>
  );
};
export default PersonalHome;
