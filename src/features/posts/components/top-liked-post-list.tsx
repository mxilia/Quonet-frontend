"use client"

import { useTopLikedPosts } from "../api/get-top-liked-posts"
import { TopLikedPostsListSkeleton } from "./skeletons/top-liked-posts-list-skeleton"
import { SmallPost } from "./small-post"

type TopLikedPostsList = {
  authorId?: string
  threadId?: string
  title?: string
  limit?: number
}

export const TopLikedPostsList = ({ authorId, threadId, title, limit }: TopLikedPostsList) => {
  const topLikedPosts = useTopLikedPosts({ authorId, threadId, title, limit })
  if (topLikedPosts.isLoading) return <TopLikedPostsListSkeleton />
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
