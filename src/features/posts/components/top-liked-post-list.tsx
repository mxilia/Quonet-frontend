"use client"

import { Post } from "@/types/api"
import { useTopLikedPosts } from "../api/get-top-liked-posts"
import { ImageFrame } from "@/components/ui/image-frame/image-frame"
import { path } from "@/config/path"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton/skeleton"

type TopLikedPostsList = {
  authorId?: string
  threadId?: string
  title?: string
  limit?: number
}

type SmallPostProps = {
  post: Post
}

export const SmallPost = ({ post }: SmallPostProps) => {
  return (
    <div className="inline-flex w-50 flex-col justify-between rounded-xl border border-black bg-(--darker-foreground) p-2 hover:border-(--secondary)">
      <div className="inline-flex max-w-50 gap-2">
        <ImageFrame
          src={post.thumbnail_url}
          width={40}
          height={40}
          className=""
          imgClassName="border border-neutral-500 flex aspect-square justify-center rounded-xl aspect-square rounded-lg"
          alt=""
        />
        <div>
          <Link
            href={path.public.post.getHref(post.id)}
            className="line-clamp-1 pr-2 hover:underline"
          >
            {post.title}
          </Link>
          <p className="line-clamp-3 max-h-12 max-w-30 text-xs whitespace-pre-line text-neutral-400">
            {post.content}
          </p>
        </div>
      </div>
      <div className="text-xs text-neutral-300">
        {`posted by `}
        <Link href={path.public.user.getHref(post.author.id)} className="hover:underline">
          {post.author.handler}
        </Link>
        <br />
        <Link
          href={path.public.post.getHref(post.id)}
          className="text-xs text-(--secondary) hover:underline"
        >
          (view full)
        </Link>
      </div>
    </div>
  )
}

const SmallPostSkeleton = () => {
  return (
    <div className="inline-flex w-50 flex-col justify-between rounded-xl border border-black bg-(--darker-foreground) p-2">
      <div className="inline-flex max-w-50 gap-2">
        <Skeleton className="h-10 w-10" />
        <div>
          <Skeleton className="mb-1 h-5 w-12" />
          <Skeleton className="h-12 w-30" />
        </div>
      </div>
      <Skeleton className="mb-1 h-5 w-12" />
      <Skeleton className="h-5 w-12" />
    </div>
  )
}

export const TopLikedPostsList = ({ authorId, threadId, title, limit }: TopLikedPostsList) => {
  const topLikedPosts = useTopLikedPosts({ authorId, threadId, title, limit })
  if (topLikedPosts.isLoading)
    return (
      <div className="w-full">
        <h1 className="mb-2 text-lg">Top Posts (Sorted by likes)</h1>
        <div className="inline-flex w-full gap-2">
          <SmallPostSkeleton />
          <SmallPostSkeleton />
          <SmallPostSkeleton />
        </div>
      </div>
    )
  if (!topLikedPosts.data || topLikedPosts.data?.length === 0) return null
  return (
    <div className="w-full">
      <h1 className="mb-2 text-lg">Top Posts (Sorted by likes)</h1>
      <div className="inline-flex w-full gap-2">
        {topLikedPosts.data?.map((e) => (
          <SmallPost key={e.id} post={e} />
        ))}
      </div>
    </div>
  )
}
