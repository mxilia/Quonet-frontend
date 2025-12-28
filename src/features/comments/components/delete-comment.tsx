'use client';

import { useUser } from "@/lib/auth";
import { canDeleteComment } from "@/lib/authorization";
import { useDeleteComment } from "../api/delete-comment";
import { Comment } from "@/types/api";

type DeleteCommentProps = {
  comment: Comment;
}

export const DeleteComment = ({ comment } : DeleteCommentProps) => {
  const user = useUser();
  
  if(!canDeleteComment(user.data, comment)) return null;
  const deleteComment = useDeleteComment();

  return <button className="text-red-500 text-xs" onClick={() => deleteComment.mutate({ commentId: comment.id })}>delete</button>
}