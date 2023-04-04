import useDirectory from "@/hooks/useDirectory";
import React from "react";
import { GrAdd } from "react-icons/gr";

const Communities: React.FC = () => {
  const { closeMenu } = useDirectory();
  return (
    <>
      <h2 className="uppercase text-[0.625rem] text-gray-500 font-medium px-4 py-2">
        your communities
      </h2>
      <li role="menuitem">
        <button
          tabIndex={0}
          onClick={closeMenu}
          className="text-gray-700 flex items-center gap-2 w-full px-4 py-2 text-sm leading-5 text-left hover:bg-redditLightBlue  group motion-safe:transition-colors motion-reduce:transition-none overflow-hidden"
          role="menuitem"
        >
          <GrAdd />
          <span className="capitalize">create community</span>
        </button>
      </li>
    </>
  );
};
export default Communities;
