'use client';

import { Post } from "@/types/api";
import { useTopLikedPosts } from "../api/get-top-liked-posts";
import { ImageFrame } from "@/components/ui/image-frame/image-frame";
import { path } from "@/config/path";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton/skeleton";

type TopLikedPostsList = {
  authorId?: string;
  threadId?: string;
  title?: string;
  limit?: number;
}

type SmallPostProps = {
  post: Post;
}

export const SmallPost = ({ post } : SmallPostProps ) => {
  return (
    <div className="bg-(--darker-foreground) p-2 rounded-xl w-50 border border-black hover:border-(--secondary) inline-flex flex-col justify-between">
      <div className="inline-flex max-w-50 gap-2">
        <ImageFrame src={post.thumbnail_url} width={40} height={40} className="" imgClassName="border border-neutral-500 flex aspect-square justify-center rounded-xl aspect-square rounded-lg" alt="" />
        <div>
          <Link href={path.public.post.getHref(post.id)} className="line-clamp-1 hover:underline pr-2">{post.title}</Link>
          <p className="line-clamp-3 text-xs text-neutral-400 max-h-12 max-w-30 whitespace-pre-line">{post.content}</p>
        </div>
      </div>
      <div className="text-xs text-neutral-300">
        {`posted by `}
        <Link href={path.public.user.getHref(post.author.id)} className="hover:underline">
        {post.author.handler}
        </Link><br/>
        <Link href={path.public.post.getHref(post.id)} className="text-xs text-(--secondary) hover:underline">(view full)</Link>
      </div>
    </div>
  )
}

const SmallPostSkeleton = () => {
  return (
    <div className="bg-(--darker-foreground) p-2 rounded-xl w-50 border border-black inline-flex flex-col justify-between">
      <div className="inline-flex max-w-50 gap-2">
        <Skeleton className="w-10 h-10"/>
          <div>
            <Skeleton className="h-5 w-12 mb-1" />
            <Skeleton className="h-12 w-30" />
          </div>
      </div>
      <Skeleton className="h-5 w-12 mb-1" />
      <Skeleton className="h-5 w-12" />
    </div>
  );
}

export const TopLikedPostsList = ({ authorId, threadId, title, limit } : TopLikedPostsList) => {
  const topLikedPosts = useTopLikedPosts({ authorId, threadId, title, limit });
  if(topLikedPosts.isLoading) return (
    <div className="w-full">
      <h1 className="text-lg mb-2">Top Posts (Sorted by likes)</h1>
      <div className="inline-flex w-full gap-2">
        <SmallPostSkeleton />
        <SmallPostSkeleton />
        <SmallPostSkeleton />
      </div>
    </div>
  );
  if(!topLikedPosts.data || topLikedPosts.data?.length === 0) return null;
  return (
    <div className="w-full">
      <h1 className="text-lg mb-2">Top Posts (Sorted by likes)</h1>
      <div className="inline-flex w-full gap-2">
        {
          topLikedPosts.data?.map((e) => <SmallPost key={e.id} post={e}/>)
        }
      </div>
    </div>
  )
}