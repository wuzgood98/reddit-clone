import { communityState } from "@/atoms/communitiesAtom";
import {
  DirectoryMenuItem,
  directoryMenuState,
} from "@/atoms/directoryMenuAtom";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);
  const communityStateValue = useRecoilValue(communityState);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  const closeMenu = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: false,
      isCommunityModalOpen: true,
    }));
  };

  const openCreateCommunityModal = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isCommunityModalOpen: true,
    }));
  };

  const closeCreateCommunityModal = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isCommunityModalOpen: false,
    }));
  };

  useEffect(() => {
    const { currentCommunity } = communityStateValue;
    if (currentCommunity) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          imageURL: currentCommunity.imageURL,
          communityName: currentCommunity.id,
          route: `/r/${currentCommunity.id}`,
        },
      }));
    }
  }, [communityStateValue.currentCommunity]);

  return {
    directoryState,
    setDirectoryState,
    toggleMenuOpen,
    onSelectMenuItem,
    closeMenu,
    openCreateCommunityModal,
    closeCreateCommunityModal,
  };
};
export default useDirectory;
