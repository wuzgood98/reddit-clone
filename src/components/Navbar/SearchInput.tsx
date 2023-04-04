import React from "react";
import styles from "./Search.module.css";
import { User } from "firebase/auth";
import { Search } from "lucide-react";

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  return (
    <div
      className={`${styles.focus} my-0 mx-auto flex-grow ${
        user ? "max-w-[auto]" : "max-w-2xl"
      } flex h-auto w-auto items-center rounded-full bg-[#f1f4f8] px-3 border border-[#e8edf3] hover:border-redditBlue hover:bg-[#ffffff] motion-safe:transition-colors motion-reduce:transition-none`}
    >
      <form method="get" className="w-full h-full flex items-center gap-2">
        <label htmlFor="search" className="pointer-events-none">
          <Search stroke="#878a93" strokeWidth={1} />
        </label>
        <input
          type="search"
          placeholder="Search Reddit"
          id="search"
          name="search"
          className="bg-transparent h-full w-full outline-none border-none appearance-none placeholder:text-sm placeholder:font-normal"
        />
      </form>
    </div>
  );
};
export default SearchInput;
