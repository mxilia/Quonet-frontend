"use client";

import { useInfinitePosts } from "../api/get-posts";
import { DeletePost } from "./delete-post";
import { UpdatePost } from "./update-post";
import { Post } from "@/types/api";
import Image from "next/image";
import { timestampToDate } from "@/utils/format";
import { LikeModify } from "@/features/likes/components/like-modify";
import { path } from "@/config/path";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { LikeButton } from "@/features/likes/components/like-button";
import { LikeCounter } from "@/features/likes/components/like-counter";
import { ImageFrame } from "@/components/ui/image-frame/image-frame";

type PostsListProps = {
  authorId?: string, 
  threadId?: string, 
  title?: string,
}

type MediumPostProps = {
  post: Post;
}

const MediumPost = ({ post } : MediumPostProps) => {
  return (
    <div className="inline-flex flex-col w-150 border border-(--foreground) p-3 rounded-xl mt-5">
      <div className="inline-flex gap-2">
        <Image src={ post.author.profile_url ? post.author.profile_url : "/default-avatar.png"} height={30} width={30} alt="user profile" className="border rounded-2xl w-10 h-10 flex items-center justify-center bg-white"/>
        <div>
          <Link href={path.public.user.getHref(post.author.id)} className="hover:underline text-[16px] text-neutral-300 inline">{ post.author.handler }</Link>
          <div className="text-xs text-neutral-500">{ timestampToDate(post.created_at) }</div>
        </div>
      </div>
      <Link href={path.public.post.getHref(post.id)}>
        <div className="text-xl text-neutral-100 hover:underline inline">{ post.title }</div>
      </Link>
      <Link href={path.public.thread.getHref(post.thread.id)} className="inline-flex items-center">
        { 
          post.thread.image_url === "" ? 
          <div className="rounded-md h-6 w-6 bg-(--foreground) text-[6px] inline-flex items-center justify-center"> no img </div> 
          :
          <Image src={post.thread.image_url} height={24} width={24} alt="thread img" className="rounded-2xl" />
        }
        <div className="inline ml-2 text-sm text-(--secondary) hover:underline">
          {`/thread/${post.thread.title}`}
        </div>
      </Link>
      <p className="whitespace-pre-line mt-3 text-[16px] text-neutral-200">{ post.content }</p>
      <ImageFrame src={"/temp.png"} height={80} width={80} imgClassName="w-50" className="flex justify-center mt-3 bg-(--darker-foreground) rounded-xl" alt={""} />
      <div className="mt-3 flex gap-2 items-center">
        <LikeModify parentId={post.id} parentType="post" className="flex gap-2 bg-(--darker-foreground) p-2.5 rounded-xl">
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
        <Link href={path.public.post.getHref(post.id)} className="bg-(--darker-foreground) rounded-xl flex justify-center items-center w-11 h-11 pt-0.5">
          <Image src="/comment-icon.png" height={27} width={27} alt="comment img" className="invert-90"/>
        </Link>
        <DeletePost postId={post.id} threadId={post.thread_id}/>
        <UpdatePost postId={post.id} threadId={post.thread_id}/>
      </div>
    </div>
  )
}

export const PostsList = ({ authorId, threadId, title } : PostsListProps) => {
  const postsQuery = useInfinitePosts({ authorId, threadId, title });
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    if (!postsQuery.hasNextPage) return;

    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if(entry.isIntersecting && !postsQuery.isFetchingNextPage){
        postsQuery.fetchNextPage();
      }
    });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [
    postsQuery.fetchNextPage,
    postsQuery.hasNextPage,
    postsQuery.isFetchingNextPage,
  ]);

  if(postsQuery.isLoading) return ( <div> loading.. </div> );

  const posts = postsQuery.data?.pages.flatMap((page) => page.data);

  if(!posts || posts?.length === 0) return <div>no posts found</div>
  
  return (
    <div className="inline-flex flex-col">
      {posts?.map((e) => (<MediumPost key={e.id} post={e}/>))}
      {postsQuery.hasNextPage && <div ref={loadMoreRef}>Loading more..</div>}
    </div>
  );
}