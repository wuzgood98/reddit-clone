import React from 'react';
import styles from './Search.module.css';
import { User } from 'firebase/auth';

type SearchInputProps = {
  user?: User | null
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {

  return (
    <div className={`${styles.focus} my-0 mx-auto flex-grow ${user ? 'max-w-[auto]' : 'max-w-2xl'} flex h-auto w-auto items-center rounded-full bg-[#f1f4f8] px-3 border border-[#e8edf3] hover:border-redditBlue hover:bg-[#ffffff] [:has(input[type="search"]:focus):border-redditBlue] motion-safe:transition-colors motion-reduce:transition-none`}>
      <form method='get' className='w-full h-full flex items-center gap-2'>
        <label htmlFor="search" className='pointer-events-none'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#878a93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </label>
        <input type="search" placeholder='Search Reddit' id='search' name='search' className='bg-transparent h-full w-full outline-none border-none appearance-none' />
      </form>
    </div>
  )
}
export default SearchInput;