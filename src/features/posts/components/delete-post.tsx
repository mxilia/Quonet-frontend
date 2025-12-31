"use client"

import { useUser } from "@/lib/auth"
import { useDeletePost } from "../api/delete-post"
import { canDeletePost } from "@/lib/authorization"
import { Post } from "@/types/api"
import { useNotificationStore } from "@/components/ui/notification/notification.store"

type DeletePostProps = {
  post: Post
}

export const DeletePost = ({ post }: DeletePostProps) => {
  const user = useUser()
  const deletePost = useDeletePost()
  const notify = useNotificationStore((s) => s.notify)

  if (!canDeletePost(user.data, post)) return null
  if (user.isLoading) return null

  const onDelete = () =>
    deletePost.mutate(
      { postId: post.id },
      {
        onSuccess: () => {
          notify({
            type: "success",
            message: "Deleted post successfully",
          })
        },
        onError: () => {
          notify({
            type: "error",
            message: "Failed to delete post",
          })
        },
      },
    )

  return (
    <div>
      <button className="text-xs text-red-500" onClick={onDelete}>
        delete
      </button>
    </div>
  )
}
