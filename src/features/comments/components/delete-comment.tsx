'use client';

import { useUser } from "@/lib/auth";
import { canDeleteComment } from "@/lib/authorization";
import { useDeleteComment } from "../api/delete-comment";
import { Comment } from "@/types/api";
import { useNotificationStore } from "@/components/ui/notification/notification.store";

type DeleteCommentProps = {
  comment: Comment;
}

export const DeleteComment = ({ comment } : DeleteCommentProps) => {
  const user = useUser();
  const deleteComment = useDeleteComment();
  const notify = useNotificationStore((s) => s.notify);

  if(!canDeleteComment(user.data, comment)) return null;
  const onDelete = () => deleteComment.mutate(
    { commentId: comment.id },
    {
      onSuccess: () => {
        notify({
          type: "success",
          message: "Deleted comment successfully",
        });
      },
      onError: () => {
        notify({
          type: "error",
          message: "Failed to delete comment",
        });
      }
    }
  )

  return <button className="text-red-500 text-xs" onClick={onDelete}>delete</button>
}