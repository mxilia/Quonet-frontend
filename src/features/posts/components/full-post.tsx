'use client';

import { timestampToDate } from "@/utils/format";
import { usePost } from "../api/get-post";
import Image from "next/image";
import Link from "next/link";
import { path } from "@/config/path";
import { LikeModify } from "@/features/likes/components/like-modify";
import { DeletePost } from "./delete-post";
import { UpdatePost } from "./update-post";
import { Comments } from "@/features/comments/components/comments";
import { LikeButton } from "@/features/likes/components/like-button";
import { LikeCounter } from "@/features/likes/components/like-counter";
import { ImageFrame } from "@/components/ui/image-frame/image-frame";

type FullPostProps = {
  postId: string;
}

export const FullPost = ({ postId } : FullPostProps) => {
  const postQuery = usePost({postId});
  if(postQuery.isLoading) return <div>loading</div>;
  const post = postQuery.data
  if(!post) return <div>post not found</div>
  return (
    <div className="inline-flex flex-col w-200 p-4">
      <Link href={path.public.thread.getHref(post.thread.id)} className="inline-flex items-center">
        { 
          post?.thread.image_url === "" ? 
          <div className="rounded-[14px] h-10 w-10 bg-(--foreground) text-[6px] flex items-center justify-center"> no img </div> 
          :
          <Image src={post.thread.image_url} height={40} width={40} alt="thread img" className="rounded-2xl" />
        }
        <div className="ml-2 text-lg text-(--secondary) hover:underline">
          {`${post.thread.title}`}
        </div>
      </Link>
      <div className="text-3xl text-neutral-100 inline mt-3">{ post?.title }</div>
      <p className="whitespace-pre-line mt-3 text-[16px] text-neutral-100">{ post?.content }</p>
      <ImageFrame src={post.thumbnail_url} height={80} width={80} imgClassName="w-50" className="flex justify-center mt-3 bg-(--darker-foreground) rounded-xl" alt={""} />
      <div className="inline-flex gap-2 items-center text-[16px] text-neutral-200 mt-2">
        Posted by
        <ImageFrame src={ post?.author.profile_url ? post.author.profile_url : "/default-avatar.png"} height={50} width={50} alt="user profile" imgClassName="border rounded-xl w-8 h-8 border-(--foreground) flex items-center justify-center bg-white" />
        <Link href={path.public.user.getHref(post.author_id)} className="hover:underline">{ post.author.handler }</Link> • { timestampToDate(post.created_at) }
      </div>
      <div className="mt-3 flex justify-between mb-4">
        <LikeModify parentId={post.id} parentType="post" className="flex gap-2 bg-(--darker-foreground) p-2 rounded-xl">
          {
            ({ parentId, parentType, likeState, user, createLike, likeCount }) => 
              <>
              <LikeButton 
                parentId={parentId} 
                parentType={parentType} 
                createLike={createLike} 
                likeState={likeState} 
                user={user} value={true} 
                className="w-0 h-0 
                          border-l-8 border-l-transparent
                          border-r-8 border-r-transparent
                          border-b-12 border-b-neutral-200"
                activatedClassName="w-0 h-0 
                          border-l-8 border-l-transparent
                          border-r-8 border-r-transparent
                          border-b-12 border-b-(--secondary)"
              />
              <LikeCounter likeCount={likeCount} />
              <LikeButton 
                parentId={parentId} 
                parentType={parentType} 
                createLike={createLike} 
                likeState={likeState} 
                user={user} value={false} 
                className="w-0 h-0 
                          border-l-8 border-l-transparent
                          border-r-8 border-r-transparent
                          border-t-12 border-t-neutral-200"
                activatedClassName="w-0 h-0 
                          border-l-8 border-l-transparent
                          border-r-8 border-r-transparent
                          border-t-12 border-t-(--secondary)"
              />
            </>
          }
        </LikeModify>
        <DeletePost postId={post.id} authorHandler={post.author.handler}/>
        <UpdatePost postId={post.id} threadId={post.thread_id}/>
      </div>
      <div className="text-xl mb-2">Comments</div>
      <Comments rootId={postId}/>
    </div>
  )
}