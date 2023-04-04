import { auth } from "@/firebase/clientApp";
import autoAnimate from "@formkit/auto-animate";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import useDirectory from "@/hooks/useDirectory";
import { defaultMenuItem } from "@/atoms/directoryMenuAtom";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <header className="h-12 py-[0.375rem] px-3 flex gap-3 bg-white">
      <Link
        href="/"
        onClick={() => onSelectMenuItem(defaultMenuItem)}
        aria-label="Home"
        className="flex items-center shrink-0"
      >
        <Image
          src="/images/redditFace.svg"
          alt="reddit face logo"
          className="h-8 w-8"
          height={2500}
          width={2500}
          priority
        />
        <Image
          src="/images/redditText.svg"
          alt="reddit logo text that says reddit"
          height={800}
          width={1200}
          className="hidden lg:block h-[2.875rem] w-20"
          priority
        />
      </Link>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </header>
  );
};
export default Navbar;
