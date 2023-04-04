import { atom } from "recoil";

export type DirectoryMenuItem = {
  communityName: string;
  imageURL?: string;
  route: string;
};

interface DirectoryMenuState {
  isOpen: boolean;
  isCommunityModalOpen: boolean;
  selectedMenuItem: DirectoryMenuItem;
}

export const defaultMenuItem: DirectoryMenuItem = {
  communityName: "Home",
  imageURL: "",
  route: "/",
};

export const defaultMenuState: DirectoryMenuState = {
  isOpen: false,
  isCommunityModalOpen: false,
  selectedMenuItem: defaultMenuItem,
};

export const directoryMenuState = atom<DirectoryMenuState>({
  key: "directoryMenuState",
  default: defaultMenuState,
});
