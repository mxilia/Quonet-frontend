"use client"

import { useUser } from "@/lib/auth"
import { useDeleteThread } from "../api/delete-thread"
import { canDeleteThread } from "@/lib/authorization"
import { Skeleton } from "@/components/ui/skeleton/skeleton"

type DeleteThreadProps = {
  threadId: string
}

export const DeleteThread = ({ threadId }: DeleteThreadProps) => {
  const user = useUser()
  const deleteThread = useDeleteThread()

  if (user.isLoading) return <Skeleton className="h-7 w-17" />
  if (!canDeleteThread(user.data)) return null

  return (
    <div>
      <button
        className="text-xs text-red-500 hover:underline"
        onClick={() => deleteThread.mutate({ threadId: threadId })}
      >
        delete
      </button>
    </div>
  )
}
