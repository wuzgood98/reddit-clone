import { Post } from "@/atoms/postAtoms";
import autoAnimate from "@formkit/auto-animate";
import moment from "moment";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { IoArrowRedoOutline, IoBookmarkOutline } from "react-icons/io5";
import UseImage from "../Global/Image";
import Spinner from "../Global/Spinner";
import PostError from "./PostError";
import { useRouter } from "next/router";
import Link from "next/link";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: MouseEvent<HTMLButtonElement>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDeletePost: (
    event: MouseEvent<HTMLButtonElement>,
    post: Post
  ) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homepage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onDeletePost,
  onSelectPost,
  onVote,
  homepage,
}) => {
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const parent = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const upVote: number = 1,
    downVote: number = -1,
    singlePostPage: boolean = !onSelectPost;

  const deletePost = async (event: MouseEvent<HTMLButtonElement>) => {
    setLoadingDelete(true);
    setError("");
    try {
      const success = await onDeletePost(event, post);
      if (!success) {
        throw new Error("Failed to delete post");
      }
      setError("");
      setLoadingDelete(false);
      console.log("Post was successfully deleted");
      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      console.log("deletePost error: ", error.message);
      setError(error.message);
      setLoadingDelete(false);
    }
  };

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);
  //`/r/${post.communityId}/comments/${post.id}`
  return (
    <div
      className={`${
        singlePostPage
          ? "border-transparent rounded-t-[0.25rem] rounded-r-[0.25rem] rounded-b-none rounded-l-none"
          : "border-gray-300 hover:border-gray-400 rounded-[0.25rem] cursor-pointer"
      } flex border bg-white overflow-hidden  motion-reduce:transition-none motion-safe:transition-colors`}
    >
      <div
        className={`${
          singlePostPage ? "bg-none" : "bg-gray-100"
        } w-10 flex flex-col items-center py-2`}
      >
        <button
          onClick={(event) => onVote(event, post, upVote, post.communityId)}
          aria-label="Upvote"
          className="group"
          type="button"
        >
          <span className="sr-only">Upvote</span>
          <svg
            className={`${
              userVoteValue === 1
                ? "fill-redditOrange stroke-none"
                : "fill-none stroke-[#7f8183]"
            } group-hover:stroke-redditOrange motion-safe:transition-colors motion-reduce:transition-none w-[1.5rem] h-[1.2rem]`}
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
          className={`text-xs font-bold ${
            userVoteValue === 1
              ? "text-redditOrange"
              : userVoteValue === -1
              ? "text-redditBlue"
              : "text-gray-900"
          } motion-safe:transition-colors motion-reduce:transition-none`}
        >
          {post.voteStatus === 0 ? "Vote" : post.voteStatus}
        </span>
        <span className="sr-only">{post.voteStatus}</span>
        <button
          onClick={(event) => onVote(event, post, downVote, post.communityId)}
          aria-label="Downvote"
          className="group"
          type="button"
        >
          <span className="sr-only">Downvote</span>
          <svg
            className={`${
              userVoteValue === -1
                ? "fill-redditBlue stroke-none"
                : " fill-none stroke-[#7f8183]"
            } group-hover:stroke-redditBlue motion-safe:transition-colors motion-reduce:transition-none w-[1.5rem] h-[1.2rem]`}
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
      <div ref={parent} className="flex flex-col w-full relative">
        {error && <PostError text={error} />}
        <div className="flex flex-col w-full p-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-[0.4rem] text-xs">
              {homepage && (
                <>
                  <UseImage
                    imageURL={
                      post.communityImageURL
                        ? post.communityImageURL
                        : "/images/redditFace.svg"
                    }
                    alt={`r/${post.communityId} community avatar`}
                    className="h-5 w-5 rounded-full"
                  />
                  <Link
                    href={`r/${post.communityId}`}
                    aria-label={`r/${post.communityId}`}
                    className="font-medium hover:underline"
                  >
                    {`r/${post.communityId}`}
                  </Link>
                  <span
                    aria-hidden="true"
                    className="h-[0.12rem] w-[0.12rem] rounded-full bg-gray-400"
                  />
                </>
              )}
              <span className="text-gray-400">
                Posted by u/{post.authorDisplayName}{" "}
                {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
              </span>
            </div>
            <Link
              href={`/r/${post.communityId}/comments/${post.id}`}
              aria-label={`View more about ${post.communityId}`}
              onClick={() => onSelectPost && onSelectPost(post)}
              className={`${
                singlePostPage ? "pointer-events-none" : "pointer-events-auto"
              } text-lg font-medium text-gray-900 break-words`}
            >
              {post.title}
            </Link>
            <Link
              href={`/r/${post.communityId}/comments/${post.id}`}
              aria-label={`View more about ${post.communityId}`}
              onClick={() => onSelectPost && onSelectPost(post)}
              className={`${
                singlePostPage ? "pointer-events-none" : "pointer-events-auto"
              } text-gray-600 font-normal text-sm`}
            >
              {post.body}
            </Link>
            {post.imageURL && (
              <div className="flex justify-center p-2">
                {loadingImage && (
                  <div className="h-48 w-full rounded bg-gray-300 animate-pulse"></div>
                )}
                <Link
                  href={`/r/${post.communityId}/comments/${post.id}`}
                  aria-label={`View more about ${post.communityId}`}
                  onClick={() =>
                    !singlePostPage && onSelectPost && onSelectPost(post)
                  }
                  className={
                    singlePostPage
                      ? "pointer-events-none"
                      : "pointer-events-auto"
                  }
                >
                  <UseImage
                    imageURL={post.imageURL}
                    className={`${
                      loadingImage ? "hidden" : "block"
                    } max-h-[28.75rem] w-full`}
                    alt="Post Image"
                    onLoad={() => setLoadingImage(false)}
                  />
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Link
              href={`/r/${post.communityId}/comments/${post.id}`}
              aria-label={`Browse comments or leave a comment on ${post.communityId} community`}
              onClick={() => onSelectPost && onSelectPost(post)}
              className={`${
                singlePostPage ? "pointer-events-none" : "pointer-events-auto"
              } flex items-center gap-1 py-2 px-[0.625rem] hover:bg-gray-100 rounded-[0.25rem] motion-safe:transition-colors motion-reduce:transition-none`}
            >
              <BsChat />
              <span>{post.numberOfComments}</span>
              <span className="sr-only">{post.numberOfComments}</span>
              <span className="sr-only">comments</span>
              <span className="capitalize">comments</span>
            </Link>
            <button
              aria-label="Share post"
              type="button"
              className="flex items-center gap-1 py-2 px-[0.625rem] hover:bg-gray-100 rounded-[0.25rem] motion-safe:transition-colors motion-reduce:transition-none"
            >
              <IoArrowRedoOutline />
              <span className="sr-only">share post</span>
              <span className="capitalize">share</span>
            </button>
            <button
              aria-label="Save post"
              type="button"
              className="flex items-center gap-1 py-2 px-[0.625rem] hover:bg-gray-100 rounded-[0.25rem] motion-safe:transition-colors motion-reduce:transition-none"
            >
              <IoBookmarkOutline />
              <span className="sr-only">save post</span>
              <span className="capitalize">save</span>
            </button>
            {userIsCreator && (
              <button
                onClick={deletePost}
                aria-label="Delete post"
                type="button"
                className={`flex items-center gap-1 py-2 px-[0.625rem] ${
                  !loadingDelete && "hover:bg-gray-100"
                } rounded-[0.25rem] motion-safe:transition-colors motion-reduce:transition-none`}
              >
                {loadingDelete ? (
                  <Spinner color="#878a93" />
                ) : (
                  <>
                    <AiOutlineDelete />
                    <span className="sr-only">delete post</span>
                    <span className="capitalize">delete</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostItem;
