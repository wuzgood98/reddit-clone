import React from 'react';
import { TabItemType } from './NewPostForm';

type TabItemProps = {
  item: TabItemType
  selectTab: (tab: string) => void
  selectedTab: string
};

const TabItem: React.FC<TabItemProps> = ({ item, selectTab, selectedTab }) => {

  return (
    <button onClick={() => selectTab(item.title)} type='button' aria-label='Post tab' className={`${item.title === selectedTab ? 'text-redditBlue after:bg-redditBlue bg-blue-100/30' : 'after:bg-gray-200 text-gray-400 border-gray-200'}  capitalize bg-none hover:bg-blue-100/30 text-sm font-bold px-4 py-3 grow border-r items-center last-of-type:border-r-0 flex gap-1 relative after:absolute after:w-full after:bottom-0 after:h-[0.125rem] after:left-0 motion-reduce:transition-none motion-safe:transition-colors`}>
      <item.icon />
      <span>{item.title}</span>
    </button>
  )
}
export default TabItem;