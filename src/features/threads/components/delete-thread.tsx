"use client"

import { useUser } from "@/lib/auth"
import { useDeleteThread } from "../api/delete-thread"
import { canDeleteThread } from "@/lib/authorization"
import { Skeleton } from "@/components/ui/skeleton/skeleton"

type DeleteThreadProps = {
  threadId: string
}

export const DeleteThread = ({ threadId }: DeleteThreadProps) => {
  const { data: user, isLoading, error } = useUser()
  const deleteThread = useDeleteThread()

  if (!canDeleteThread(user)) return null
  if (isLoading) return <Skeleton className="h-7 w-17" />

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
