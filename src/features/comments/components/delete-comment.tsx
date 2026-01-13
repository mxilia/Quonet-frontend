"use client"

import { useUser } from "@/lib/auth"
import { canDeleteComment } from "@/lib/authorization"
import { useDeleteComment } from "../api/delete-comment"
import { Comment } from "@/types/api"
import { useNotificationStore } from "@/components/ui/notification/notification.store"

type DeleteCommentProps = {
  comment: Comment
}

export const DeleteComment = ({ comment }: DeleteCommentProps) => {
  const user = useUser()
  const deleteComment = useDeleteComment()
  const notify = useNotificationStore((s) => s.notify)

  if (!canDeleteComment(user.data, comment)) return null
  const onDelete = () =>
    deleteComment.mutate(
      { commentId: comment.id },
      {
        onSuccess: () => {
          notify({
            type: "success",
            message: "Deleted comment successfully",
          })
        },
        onError: (error) => {
          notify({
            type: "error",
            message: "Failed to delete comment "+error.message,
          })
        },
      },
    )

  return (
    <button className="text-xs text-red-500" onClick={onDelete}>
      delete
    </button>
  )
}
