import UseImage from "@/components/Global/Image";
import Spinner from "@/components/Global/Spinner";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import Link from "next/link";
import React from "react";

export type Comment = {
  id: string;
  creatorId: string;
  authorDisplayName: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => Promise<boolean>;
  deleteLoading: boolean;
  userId: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDeleteComment,
  deleteLoading,
  userId,
}) => {
  return (
    <div className="flex">
      <div className="mr-2 h-7 w-7">
        <UseImage
          imageURL="/images/profileIcon_headshot.png"
          alt="reddit face logo"
          className="block h-full w-full origin-[bottom_center]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="flex items-center gap-1 flex-wrap min-h-[1.125rem] text-xs">
          <Link
            href={`/user/${comment.authorDisplayName}`}
            aria-label={`View more about ${comment.authorDisplayName}`}
            className="text-gray-800 font-medium"
          >
            {comment.authorDisplayName}
          </Link>
          <span
            aria-hidden="true"
            className="h-[0.185rem] w-[0.185rem] rounded-full bg-gray-300"
          />
          <span className="text-gray-500 font-normal">
            {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
          </span>

          {deleteLoading && <Spinner color="#878a93" />}
        </span>

        <div className="text-sm overflow-auto font-normal break-words text-gray-800">
          <p>{comment.text}</p>
        </div>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <button
              onClick={() => {}}
              aria-label="Upvote"
              className="group"
              type="button"
            >
              <span className="sr-only">Upvote</span>
              <svg
                className={`fill-none stroke-[#7f8183] group-hover:stroke-redditOrange motion-safe:transition-colors motion-reduce:transition-none h-[1.2rem]`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21V10H5l7-7 7 7h-4v11z"></path>
              </svg>
            </button>
            <span
              className={`text-xs font-bold text-gray-900 motion-safe:transition-colors motion-reduce:transition-none`}
            >
              {/* {post.voteStatus === 0 ? "Vote" : post.voteStatus} */}0
            </span>
            {/* <span className="sr-only">{post.voteStatus}</span> */}
            <button
              onClick={() => {}}
              aria-label="Downvote"
              className="group"
              type="button"
            >
              <span className="sr-only">Downvote</span>
              <svg
                className={`fill-none stroke-[#7f8183] group-hover:stroke-redditBlue motion-safe:transition-colors motion-reduce:transition-none h-[1.2rem]`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 3h6v11h4l-7 7-7-7h4z"></path>
              </svg>
            </button>
          </div>
          {userId === comment.creatorId && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Edit comment"
                className="capitalize text-gray-600 text-xs hover:text-redditBlue motion-safe:transition-colors motion-reduce:transition-none"
              >
                edit
              </button>
              <button
                type="button"
                aria-label="Delete comment"
                className="capitalize text-gray-600 text-xs hover:text-redditBlue motion-safe:transition-colors motion-reduce:transition-none"
                onClick={() => onDeleteComment(comment)}
              >
                delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CommentItem;
/* ${
              userVoteValue === 1
                ? "fill-redditOrange stroke-none"
                : "fill-none stroke-[#7f8183]"
            } 
            
            ${
            userVoteValue === 1
              ? "text-redditOrange"
              : userVoteValue === -1
              ? "text-redditBlue"
              : "text-gray-900"
          }

          ${
              userVoteValue === -1
                ? "fill-redditBlue stroke-none"
                : " fill-none stroke-[#7f8183]"
            }
            */
