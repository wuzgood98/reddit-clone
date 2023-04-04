import { authModalState } from "@/atoms/authModalAtom";
import { Post, postState } from "@/atoms/postAtoms";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import CommentInput from "./CommentInput";
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import CommentItem, { Comment } from "./CommentItem";
import CommentsLoader from "./CommentsLoader";

type CommentsProps = {
  user?: User | null;
  selectedPost: Post | null;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentFetchLoading, setCommentFetchLoading] = useState<boolean>(true);
  const [commentCreateLoading, setCommentCreateLoading] =
    useState<boolean>(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string>("");
  const setAuthModalState = useSetRecoilState(authModalState);
  const setPostState = useSetRecoilState(postState);

  const onCreateComment = async () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    setCommentCreateLoading(true);

    try {
      const batch = writeBatch(firestore);
      // create a comment document
      const commentDocRef = doc(collection(firestore, "comments"));

      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        authorDisplayName: user.email!.split("@")[0],
        communityId,
        postId: selectedPost?.id!,
        postTitle: selectedPost?.title!,
        text: comment,
        createdAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentDocRef, newComment);

      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      // update Post number of comments +1
      const postRef = doc(firestore, "posts", selectedPost?.id!);
      batch.update(postRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      // update client recoil state
      setComment("");
      setComments((prev) => [newComment, ...prev]);
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));
      setCommentCreateLoading(false);
    } catch (error) {
      console.log("onCreateComment error: ", error);
      setCommentCreateLoading(false);
    }
  };

  const onDeleteComment = async (comment: Comment): Promise<boolean> => {
    setDeleteLoadingId(comment.id);
    try {
      const batch = writeBatch(firestore);

      // get the document to delete
      const commentDocRef = doc(firestore, "comments", comment.id);
      batch.delete(commentDocRef);

      // update Post number of comments -1
      const postDocRef = doc(firestore, "posts", selectedPost?.id!);

      batch.update(postDocRef, {
        numberOfComments: increment(-1),
      });

      await batch.commit();

      // update client recoil state
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! - 1,
        } as Post,
      }));
      setComments((prev) => prev.filter((item) => item.id !== comment.id));

      setDeleteLoadingId("");
      return true;
    } catch (error: any) {
      console.log("onDeleteComment error", error);
      setDeleteLoadingId("");
      return false;
    }
  };

  const getPostComments = async () => {
    try {
      const commentQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost?.id),
        orderBy("createdAt", "desc")
      );

      const commentDocs = await getDocs(commentQuery);
      const comments = commentDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments as Comment[]);
      setCommentFetchLoading(false);
    } catch (error: any) {
      console.log("getPostComments error: ", error);
      setCommentFetchLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedPost) return;
    getPostComments();
  }, [selectedPost]);

  return (
    <div className="bg-white rounded-b-[0.25rem] rounded-l-[0.25rem] p-2">
      <div className="flex flex-col pl-10 pr-4 mb-6 text-sm w-full">
        {!commentFetchLoading && (
          <CommentInput
            user={user}
            comment={comment}
            setComment={setComment}
            commentCreateLoading={commentCreateLoading}
            onCreateComment={onCreateComment}
          />
        )}
      </div>
      <div className="flex flex-col gap-6 p-2">
        {commentFetchLoading ? (
          [0, 1, 2].map((item) => <CommentsLoader key={item} />)
        ) : (
          <>
            {!comments.length ? (
              <div className="flex p-12 border border-gray-100 items-center justify-center font-bold">
                <p className="opacity-30">No comments</p>
              </div>
            ) : (
              <>
                {comments.map((item) => (
                  <CommentItem
                    key={item.id}
                    comment={item}
                    deleteLoading={item.id === deleteLoadingId}
                    onDeleteComment={onDeleteComment}
                    userId={user?.uid!}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Comments;
