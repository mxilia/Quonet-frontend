'use client';

import { useUser } from "@/lib/auth";
import { useDeleteThread } from "../api/delete-thread"
import { canDeleteThread } from "@/lib/authorization";

type DeleteThreadProps = {
  threadId : string,
}

export const DeleteThread = ({ threadId } : DeleteThreadProps) => {
  const { data: user, isLoading, error } = useUser();

  if(isLoading) return (<div>is loading...</div>)
  if(!canDeleteThread(user)) return <div>forbidden</div>

  const deleteThread = useDeleteThread();

  return (
    <div>
      <button className="border border-red-500" onClick={() => deleteThread.mutate({ threadId: threadId })}>delete</button>
    </div>
  )
}