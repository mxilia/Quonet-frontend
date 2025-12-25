'use client';

import { useUser } from "@/lib/auth";
import { useDeletePost } from "../api/delete-post";
import { canDeletePost } from "@/lib/authorization";
import { Post } from "@/types/api";

type DeletePostProps = {
  post: Post;
}

export const DeletePost = ({ post } : DeletePostProps) => {
  const user = useUser();
  
  if(!canDeletePost(user.data, post)) return null;
  if(user.isLoading) return <div>is loading..</div>;

  const deletePost = useDeletePost()

  return (
    <div>
      <button className="text-red-500 text-xs" onClick={() => deletePost.mutate({ postId: post.id })}>delete</button>
    </div>
  )
}