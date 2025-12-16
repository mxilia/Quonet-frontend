import { useInfinitePosts } from "../api/get-posts";
import { DeletePost } from "./delete-post";
import { UpdatePost } from "./update-post";
import { Post } from "@/types/api";
import Image from "next/image";
import { timestampToDate } from "@/utils/format";
import { LikeModify } from "@/features/likes/components/like-modify";
import { path } from "@/config/path";
import Link from "next/link";

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
    <div className="inline-flex flex-col w-160 border border-(--foreground) p-3 rounded-xl mt-5">
      <div className="flex gap-2">
        <Image src={ post.author.profile_url ? post.author.profile_url : "/default-avatar.png"} height={30} width={30} alt="user profile" className="border rounded-2xl w-10 h-10 flex items-center justify-center bg-white"/>
        <div>
          <div className="text-[16px] text-neutral-300">{ post.author.handler }</div>
          <div className="text-xs text-neutral-500">{ timestampToDate(post.created_at) }</div>
        </div>
      </div>
      <div className="text-xl text-neutral-200">{ post.title }</div>
      <Link href={path.public.thread.getHref(post.thread.id)} className="inline-flex items-center">
        { 
          post.thread.image_url === "" ? 
          <div className="rounded-md h-6 w-6 bg-neutral-700 text-[6px] flex items-center justify-center"> no img </div> 
          :
          <Image src={post.thread.image_url} height={24} width={24} alt="thread img" className="rounded-2xl" />
        }
        <div className="ml-2 text-sm text-neutral-500">
          {`/thread/${post.thread.title}`}
        </div>
      </Link>
      <p className="whitespace-pre-line mt-3 text-[16px] text-neutral-200">{ post.content }</p>
      <div className="mt-3 flex justify-between">
        <LikeModify parentId={post.id} parentType="post" />
        <DeletePost postId={post.id} threadId={post.thread_id}/>
        <UpdatePost postId={post.id} threadId={post.thread_id}/>
      </div>
    </div>
  )
}

export const PostsList = ({ authorId = "", threadId = "", title = "" } : PostsListProps) => {
  const postsQuery = useInfinitePosts({ authorId, threadId, title });
  if(postsQuery.isLoading) return ( <div> loading.. </div> );

  const posts = postsQuery.data?.pages.flatMap((page) => page.data);

  return (
    <div className="inline-flex flex-col">
      {posts?.map((e) => (<MediumPost key={e.id} post={e}/>))}
    </div>
  );
}