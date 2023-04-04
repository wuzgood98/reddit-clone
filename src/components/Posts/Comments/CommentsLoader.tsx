import React from "react";

const CommentsLoader: React.FC = () => {
  return (
    <div className="flex gap-2 rounded w-full h-max bg-white p-2">
      <div className="w-7 h-7 bg-gray-300 rounded-full animate-pulse shrink-0"></div>
      <div className="flex flex-col gap-2 w-full px-2 self-start">
        <div className="h-[0.475rem] w-1/3 rounded bg-gray-300 animate-pulse"></div>
        <div className="h-[0.6rem] w-4/5 rounded bg-gray-300 animate-pulse"></div>
        <div className="h-[0.475rem] w-2/5 rounded bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  );
};
export default CommentsLoader;
