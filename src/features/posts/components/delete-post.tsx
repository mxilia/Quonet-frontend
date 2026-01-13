"use client"

import { useUser } from "@/lib/auth"
import { useDeletePost } from "../api/delete-post"
import { canDeletePost } from "@/lib/authorization"
import { Post } from "@/types/api"
import { useNotificationStore } from "@/components/ui/notification/notification.store"
import { cn } from "@/lib/utils"

type DeletePostProps = {
  post: Post
  className?: string
}

export const DeletePost = ({ post, className }: DeletePostProps) => {
  const user = useUser()
  const deletePost = useDeletePost({
    mutationConfig: {
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
  })
  const notify = useNotificationStore((s) => s.notify)

  if (!canDeletePost(user.data, post)) return null
  if (user.isLoading) return null

  const onDelete = () => deletePost.mutate({ postId: post.id })

  return (
    <button className={cn("text-xs text-red-500", className)} onClick={onDelete}>
      delete
    </button>
  )
}
