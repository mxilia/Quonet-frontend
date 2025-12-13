import { useUser } from "@/lib/auth";
import { useUpdatePost } from "../api/update-post";

type UpdatePostProps = {
  postId: string;
  threadId: string;
}

export const UpdatePost = ({ postId, threadId } : UpdatePostProps) => {
  const { data: user, isLoading, error } = useUser();
  
  if(isLoading) return <div>is loading...</div>

  const updatePost = useUpdatePost();

  return (
    <div>
      <button> update </button>
    </div>
  )
}