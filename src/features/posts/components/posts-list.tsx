"use client"

import { useInfinitePosts } from "../api/get-posts"
import { DeletePost } from "./delete-post"
import { UpdatePost } from "./update-post"
import { Post } from "@/types/api"
import Image from "next/image"
import { timestampToDate } from "@/utils/format"
import { LikeModify } from "@/features/likes/components/like-modify"
import { path } from "@/config/path"
import Link from "next/link"
import { RefObject, useEffect, useRef } from "react"
import { LikeButton } from "@/features/likes/components/like-button"
import { LikeCounter } from "@/features/likes/components/like-counter"
import { ImageFrame } from "@/components/ui/image-frame/image-frame"
import { Skeleton } from "@/components/ui/skeleton/skeleton"

type PostsListProps = {
  authorId?: string
  threadId?: string
  title?: string
}

type MediumPostProps = {
  post: Post
}

const MediumPost = ({ post }: MediumPostProps) => {
  return (
    <div className="mt-5 inline-flex w-full flex-col rounded-xl border border-(--foreground) p-3 pt-3 sm:w-150">
      <div className="inline-flex gap-2">
        <ImageFrame
          src={post.author.profile_url ? post.author.profile_url : "/default-avatar.png"}
          height={30}
          width={30}
          alt="user profile"
          imgClassName="rounded-2xl border border-(--foreground) rounded-2xl w-10 h-10 flex items-center justify-center bg-white"
        />
        <div>
          <Link
            href={path.public.user.getHref(post.author.id)}
            className="inline text-[16px] text-neutral-300 hover:underline"
          >
            {post.author.handler}
          </Link>
          <div className="text-xs text-neutral-500">{timestampToDate(post.created_at)}</div>
        </div>
      </div>
      <Link href={path.public.post.getHref(post.id)}>
        <div className="inline text-xl text-neutral-100 hover:underline">{post.title}</div>
      </Link>
      <Link href={path.public.thread.getHref(post.thread.id)} className="inline-flex items-center">
        {post.thread.image_url === "" ? (
          <div className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-(--foreground) text-[6px]">
            {" "}
            no img{" "}
          </div>
        ) : (
          <Image
            src={post.thread.image_url}
            height={24}
            width={24}
            alt="thread img"
            className="rounded-2xl"
          />
        )}
        <div className="ml-2 inline text-sm text-(--secondary) hover:underline">
          {`/thread/${post.thread.title}`}
        </div>
      </Link>
      <p className="mt-3 text-[16px] whitespace-pre-line text-neutral-200">{post.content}</p>
      <ImageFrame
        src={post.thumbnail_url}
        height={80}
        width={80}
        imgClassName="w-50"
        className="mt-3 flex justify-center rounded-xl bg-(--darker-foreground)"
        alt={""}
      />
      <div className="mt-3 flex items-center gap-2">
        <LikeModify
          parentId={post.id}
          parentType="post"
          className="flex gap-2 rounded-xl bg-(--darker-foreground) p-2.5"
        >
          {({ parentId, parentType, likeState, user, createLike, likeCount }) => (
            <>
              <LikeButton
                parentId={parentId}
                parentType={parentType}
                createLike={createLike}
                likeState={likeState}
                user={user}
                value={true}
                className="h-0 w-0 border-r-8 border-b-12 border-l-8 border-r-transparent border-b-neutral-200 border-l-transparent"
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
                user={user}
                value={false}
                className="h-0 w-0 border-t-12 border-r-8 border-l-8 border-t-neutral-200 border-r-transparent border-l-transparent"
                activatedClassName="w-0 h-0 
                          border-l-8 border-l-transparent
                          border-r-8 border-r-transparent
                          border-t-12 border-t-(--secondary)"
              />
            </>
          )}
        </LikeModify>
        <Link
          href={path.public.post.getHref(post.id)}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--darker-foreground) pt-0.5 pb-1"
        >
          <Image src="/blue-chat.png" height={27} width={27} alt="comment img" />
        </Link>
        <DeletePost post={post} />
        <UpdatePost postId={post.id} threadId={post.thread_id} />
      </div>
    </div>
  )
}

const MediumPostSkeleton = ({ ref }: { ref?: RefObject<HTMLDivElement | null> }) => {
  return (
    <div
      ref={ref}
      className="mt-5 inline-flex h-fit w-full flex-col rounded-xl border border-(--foreground) p-3 pt-3 pr-4 pl-4 sm:w-150 sm:p-2"
    >
      <div className="mb-2 inline-flex gap-2">
        <Skeleton className="h-10 w-10" />
        <div>
          <Skeleton className="mb-1 h-5 w-20" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <Skeleton className="mb-1 h-10 w-50" />
      <div className="mb-2 inline-flex items-center">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-3 w-14" />
      </div>
      <Skeleton className="h-50 w-full" />
    </div>
  )
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

  if (postsQuery.isLoading)
    return (
      <div className="inline-flex w-full flex-col pt-3 sm:w-150">
        <MediumPostSkeleton />
        <MediumPostSkeleton />
      </div>
    )
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
