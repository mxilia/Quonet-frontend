'use client';

import { useUser } from "@/lib/auth";
import { useDeletePost } from "../api/delete-post";

type DeletePostProps = {
  postId: string;
  threadId?: string;
}

export const DeletePost = ({ postId, threadId } : DeletePostProps) => {
  const { data: user, isLoading, error } = useUser();
  
  if(!user) return <div>forbid</div>
  if(isLoading) return <div>is loading..</div>

  const deletePost = useDeletePost()

  return (
    <div>
      <button className="text-red-500 text-xs" onClick={() => deletePost.mutate({ postId: postId, authorId: user!.id, threadId: threadId })}>delete</button>
    </div>
  )
}