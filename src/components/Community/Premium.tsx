import React from "react";
import { GiCheckedShield } from "react-icons/gi";

const Premium: React.FC = () => {
  return (
    <div className="flex flex-col bg-white rounded-[0.25rem] p-3 border border-gray-300">
      <div className="flex mb-2">
        <GiCheckedShield className="text-[1.625rem] text-redditOrange mt-2" />
        <div className="flex flex-col gap-1 pl-2">
          <p className="font-semibold capitalize text-sm">reddit premium</p>
          <p className="text-sm">
            The best Reddit experience, with monthly Coins
          </p>
        </div>
      </div>
      <button
        type="button"
        aria-label="Try now"
        aria-disabled
        className="bg-redditOrange text-white capitalize h-8 rounded-full text-sm"
      >
        try now
      </button>
    </div>
  );
};
export default Premium;
