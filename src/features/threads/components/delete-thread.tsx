'use client';

import { useUser } from "@/lib/auth";
import { useDeleteThread } from "../api/delete-thread"
import { canDeleteThread } from "@/lib/authorization";

type DeleteThreadProps = {
  threadId : string,
}

export const DeleteThread = ({ threadId } : DeleteThreadProps) => {
  const { data: user, isLoading, error } = useUser();

  if(!canDeleteThread(user)) return null;
  if(isLoading) return (<div>is loading...</div>)
  
  const deleteThread = useDeleteThread();

  return (
    <div>
      <button className="text-red-500 text-xs hover:underline" onClick={() => deleteThread.mutate({ threadId: threadId })}>delete</button>
    </div>
  )
}