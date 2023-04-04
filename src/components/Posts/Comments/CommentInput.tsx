import { User } from "firebase/auth";
import Link from "next/link";
import React, { ChangeEvent } from "react";
import styles from "./CommentInput.module.css";
import AuthButtons from "@/components/Modal/Auth/AuthButtons";
import Spinner from "@/components/Global/Spinner";

type CommentInputProps = {
  comment: string;
  setComment: (value: string) => void;
  user?: User | null;
  commentCreateLoading: boolean;
  onCreateComment: () => void;
};

const CommentInput: React.FC<CommentInputProps> = ({
  comment,
  setComment,
  user,
  commentCreateLoading,
  onCreateComment,
}) => {
  const fauxUsername = user?.email?.split("@")[0];

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  return (
    <div className="relative">
      {!user ? (
        <div className="flex items-center justify-between rounded-sm border border-gray-100 p-4">
          <p className="font-semibold">Log in or sign up to leave a comment</p>
          <AuthButtons />
        </div>
      ) : (
        <>
          <div className="mb-3">
            <span className="text-xs font-normal mr-1 text-gray-800">
              Comment as{" "}
              <Link
                href={`/user/${fauxUsername}`}
                aria-label={`View more about ${fauxUsername}`}
                className="text-green-700 text-xs font-normal"
              >
                {fauxUsername}
              </Link>
            </span>
          </div>

          <div className={`${styles.focus} group`}>
            <textarea
              value={comment}
              onChange={handleChange}
              name="comment"
              id="comment"
              cols={30}
              rows={5}
              placeholder="What are your thoughts?"
              className="max-h-[10rem] mb-0 w-full rounded-t-[0.25rem] rounded-b-none p-3  text-sm placeholder-gray-500 outline-none group-focus:bg-white motion-reduce:transition-none motion-safe:transition-colors"
            />
            <div className="flex justify-end bg-gray-100 py-2 px-3 w-full h-auto rounded-b-[0.25rem]">
              <button
                aria-label="Create comment"
                type="button"
                onClick={onCreateComment}
                className={`h-[1.625rem] ${
                  !comment.length
                    ? "pointer-events-none bg-[#99c9ed]"
                    : "pointer-events-auto bg-redditBlue hover:bg-[#1986d7]"
                } capitalize motion-reduce:transition-none motion-safe:transition-colors max-w-[8rem] w-full rounded-full text-white`}
              >
                {commentCreateLoading ? <Spinner /> : "comment"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default CommentInput;
