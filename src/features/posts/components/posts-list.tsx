import { useInfinitePosts } from "../api/get-posts";
import { DeletePost } from "./delete-post";
import { UpdatePost } from "./update-post";
import { Post } from "@/types/api";
import Image from "next/image";
import { timestampToDate } from "@/utils/format";
import { LikeModify } from "@/features/likes/components/like-modify";

type PostsListProps = {
  authorId: string, 
  threadId: string, 
  title: string,
}

type MediumPostProps = {
  post: Post;
}

const MediumPost = ({ post } : MediumPostProps) => {
  return (
    <div className="inline-flex flex-col border p-3 bg-neutral-800 rounded-xl">
      <div className="flex gap-2">
        <div className="border rounded-2xl w-10 h-10 flex items-center justify-center bg-blue-100">
          <Image src={ post.author.profile_url ? post.author.profile_url : "/default-avatar.png"} height={30} width={30} alt="user profile"/>
        </div>
        <div>
          <div className="text-sm text-neutral-300">{ post.author.handler }</div>
          <div className="text-xs text-neutral-500">{ timestampToDate(post.created_at) }</div>
        </div>
      </div>
      <div className="text-lg text-neutral-200">{ post.title }</div>
      <div className="text-sm text-neutral-200">{ post.content }</div>
      <div className="flex">
        <DeletePost postId={post.id} threadId={post.thread_id}/>
        <UpdatePost postId={post.id} threadId={post.thread_id}/>
        <LikeModify parentId={post.id} parentType="post" />
      </div>
      {post.id}
    </div>
  )
}

export const PostsList = ({ authorId = "", threadId = "", title = "" } : PostsListProps) => {
  const postsQuery = useInfinitePosts({ authorId, threadId, title });
  if(postsQuery.isLoading) return ( <div> loading.. </div> );

  const posts = postsQuery.data?.pages.flatMap((page) => page.data);

  return (
    <div>
      <h1>Post List</h1>
      <div>-----------------------------------</div>
      <div className="inline-flex flex-col">
        {posts?.map((e) => (<MediumPost key={e.id} post={e}/>))}
      </div>
    </div>
  );
}