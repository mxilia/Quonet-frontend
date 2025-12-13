'use client';

import { useInfinitePosts } from "../api/get-posts";
import { DeletePost } from "./delete-post";
import { UpdatePost } from "./update-post";

type PostsListProps = {
  authorId: string, 
  threadId: string, 
  title: string,
}

export const PostsList = ({ authorId = "", threadId = "", title = "" } : PostsListProps) => {
  const postsQuery = useInfinitePosts({ authorId, threadId, title });
  if(postsQuery.isLoading) return ( <div> loading.. </div> );

  const posts = postsQuery.data?.pages.flatMap((page) => page.data);

  return (
    <div>
      <h1>Post List</h1>
      <div>-----------------------------------</div>
      {posts?.map((e) => (
          <div key={e?.id}>
            <h1> {e?.title} </h1>
            <span> {e?.content} </span>
            <DeletePost postId={e.id} threadId={e.thread_id}/>
            <UpdatePost postId={e.id} threadId={e.thread_id}/>
          </div>
        )
      )}
      <div>-----------------------------------</div>
    </div>
  );
}