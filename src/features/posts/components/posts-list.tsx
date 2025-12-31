"use client"

import { useInfinitePosts } from "../api/get-posts"
import { useEffect, useRef } from "react"
import { MediumPostSkeleton } from "./skeletons/medium-post-skeleton"
import { MediumPost } from "./medium-post"
import { PostsListSkeleton } from "./skeletons/posts-list-skeleton"

type PostsListProps = {
  authorId?: string
  threadId?: string
  title?: string
}

export const PostsList = ({ authorId, threadId, title }: PostsListProps) => {
  const postsQuery = useInfinitePosts({ authorId, threadId, title })
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loadMoreRef.current) return
    if (!postsQuery.hasNextPage) return

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting && !postsQuery.isFetchingNextPage) {
        postsQuery.fetchNextPage()
      }
    })
    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [postsQuery.fetchNextPage, postsQuery.hasNextPage, postsQuery.isFetchingNextPage])

  const posts = postsQuery.data?.pages.flatMap((page) => page.data)

  if (postsQuery.isLoading) return <PostsListSkeleton />
  if (!posts || posts?.length === 0)
    return <div className="text-sm text-neutral-500">no posts found</div>

  return (
    <div className="inline-flex w-full flex-col pt-3 sm:w-150">
      {posts?.map((e) => (
        <MediumPost key={e.id} post={e} />
      ))}
      {postsQuery.hasNextPage && <MediumPostSkeleton ref={loadMoreRef} />}
    </div>
  )
}
