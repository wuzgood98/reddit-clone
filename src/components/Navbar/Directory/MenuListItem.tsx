import UseImage from "@/components/Global/Image";
import useDirectory from "@/hooks/useDirectory";
import Link from "next/link";
import React from "react";
import { FaReddit } from "react-icons/fa";

type MenuListItemProps = {
  communityName: string;
  imageURL?: string;
  route: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  communityName,
  imageURL,
  route,
}) => {
  const { onSelectMenuItem } = useDirectory();

  return (
    <li role="menuitem">
      <Link
        href={route}
        aria-label={`r/${communityName}`}
        tabIndex={-1}
        onClick={() => onSelectMenuItem({ communityName, imageURL, route })}
        className="text-gray-700 flex items-center gap-2 w-full px-4 py-2 text-sm leading-5 text-left hover:bg-redditLightBlue  group motion-safe:transition-colors motion-reduce:transition-none overflow-hidden"
      >
        {imageURL ? (
          <UseImage
            imageURL={imageURL}
            className="h-5 w-5 rounded-full"
            alt={`${communityName} community image`}
          />
        ) : (
          <FaReddit className="h-5 w-5" />
        )}

        <span>{`r/${communityName}`}</span>
      </Link>
    </li>
  );
};
export default MenuListItem;
