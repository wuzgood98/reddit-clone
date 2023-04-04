import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import useDirectory from "@/hooks/useDirectory";

const CreatePostLink: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const { toggleMenuOpen } = useDirectory();

  const directToSubmitPage = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    const { communityId } = router.query;
    // refactor to direct the user straight to the submit page (/submit)
    if (communityId) {
      router.push(`/r/${communityId}/submit`);
      return;
    }

    toggleMenuOpen();
  };
  
  const userName = user?.email?.split("@")[0];

  return (
    <div className="flex items-center bg-white h-14 rounded-[0.25rem] border border-gray-300 p-2 mb-4">
      <Link
        href={`/user/${userName}`}
        aria-label={`Visit user ${userName}'s page`}
        className="relative h-10 w-10 max-h-10 max-w-[2.5rem] shrink-0 mr-1"
      >
        <div className="absolute bottom-0 left-0">
          <Image
            src="/images/profileIcon_headshot.png"
            alt="reddit face logo"
            className="block scale-[1.3] origin-[bottom_center]"
            height={256}
            width={256}
            priority
          />
        </div>
      </Link>

      <input
        type="text"
        aria-label="Create post"
        aria-placeholder="Create post"
        placeholder="Create post"
        className="w-full text-sm placeholder:text-sm placeholder:font-light mr-2 bg-gray-50 border-gray-200 h-9 rounded-[0.25rem] px-4 focus:outline-none focus:bg-white border focus:border-redditBlue placeholder-gray-400 hover:bg-white hover:border-redditBlue motion-reduce:transition-none motion-safe:transition-colors"
        onClick={directToSubmitPage}
      />
      <div className="flex items-center justify-center text-align-center rounded-[0.25rem] w-auto min-w-[2.5rem] min-h-[2.5rem] hover:bg-gray-200 motion-safe:transition-colors motion-reduce:transition-none cursor-pointer">
        <IoImageOutline
          tabIndex={0}
          className="text-sm w-auto scale-105 text-gray-400 min-h-[1.25rem] min-w-[1.25rem]"
        />
      </div>
      <div className="flex items-center justify-center text-align-center rounded-[0.25rem] w-auto min-w-[2.5rem] min-h-[2.5rem] hover:bg-gray-200 motion-safe:transition-colors motion-reduce:transition-none cursor-pointer">
        <BsLink45Deg
          tabIndex={0}
          className="text-sm w-auto scale-105 text-gray-400 min-h-[1.25rem] min-w-[1.25rem]"
        />
      </div>
    </div>
  );
};
export default CreatePostLink;
