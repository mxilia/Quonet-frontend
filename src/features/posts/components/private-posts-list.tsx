'use client';

import { useInfinitePrivatePosts } from "../api/get-private-posts";
import { DeletePost } from "./delete-post";

type PrivatePostsListProps = {
  authorId: string, 
  threadId: string, 
  title: string,
}

export const PrivatePostsList = ({ authorId = "", threadId = "", title = "" } : PrivatePostsListProps) => {
  const privatePostsQuery = useInfinitePrivatePosts({ authorId, threadId, title });
  if(privatePostsQuery.isLoading) return ( <div> loading.. </div> );

  const privatePosts = privatePostsQuery.data?.pages.flatMap((page) => page.data);

  return (
    <div>
      <h1>Post List</h1>
      <div>-----------------------------------</div>
      {privatePosts?.map((e) => (
          <div key={e?.id}>
            <h1> {e?.title} </h1>
            <span> {e?.content} </span>
            <DeletePost postId={e.id} threadId={threadId}/>
          </div>
        )
      )}
      <div>-----------------------------------</div>
    </div>
  );
}