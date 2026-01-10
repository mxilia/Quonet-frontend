"use client"

import { useUser } from "@/lib/auth"
import { useDeleteThread } from "../api/delete-thread"
import { canDeleteThread } from "@/lib/authorization"
import { Skeleton } from "@/components/ui/skeleton/skeleton"
import { cn } from "@/lib/utils"

type DeleteThreadProps = {
  threadId: string
  className?: string
}

export const DeleteThread = ({ threadId, className }: DeleteThreadProps) => {
  const user = useUser()
  const deleteThread = useDeleteThread()

  if (user.isLoading) return <Skeleton className="h-7 w-17" />
  if (!canDeleteThread(user.data)) return null

  return (
    <button
      className={cn("text-xs text-red-500 hover:underline", className)}
      onClick={() => deleteThread.mutate({ threadId: threadId })}
    >
      delete
    </button>
  )
}
