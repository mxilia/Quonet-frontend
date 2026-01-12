"use client"

import { timestampToDate } from "@/utils/format"
import { usePost } from "../api/get-post"
import Image from "next/image"
import Link from "next/link"
import { path } from "@/config/path"
import { LikeModify } from "@/features/likes/components/like-modify"
import { DeletePost } from "./delete-post"
import { UpdatePost } from "./update-post"
import { Comments } from "@/features/comments/components/comments"
import { LikeButton } from "@/features/likes/components/like-button"
import { LikeCounter } from "@/features/likes/components/like-counter"
import { ImageFrame } from "@/components/ui/image-frame/image-frame"
import { FullPostSkeleton } from "./skeletons/full-post-skeleton"

type FullPostProps = {
  postId: string
}

export const FullPost = ({ postId }: FullPostProps) => {
  const postQuery = usePost({ postId })
  if (postQuery.isLoading) return <FullPostSkeleton />

  const post = postQuery.data
  if (!post) return <div className="text-sm text-neutral-500">post not found</div>
  return (
    <div className="inline-flex w-200 flex-col p-4">
      <Link href={path.public.thread.getHref(post.thread.id)} className="inline-flex items-center">
        {post?.thread.image_url === "" ? (
          <div className="bg-foreground flex h-10 w-10 items-center justify-center rounded-[14px] text-[6px]">
            {" "}
            no img{" "}
          </div>
        ) : (
          <Image
            src={post.thread.image_url}
            height={40}
            width={40}
            alt="thread img"
            className="rounded-2xl"
          />
        )}
        <div className="text-secondary ml-2 text-lg hover:underline">{`${post.thread.title}`}</div>
      </Link>
      <div className="mt-3 inline text-3xl text-neutral-100">{post?.title}</div>
      <p className="mt-3 text-[16px] whitespace-pre-line text-neutral-100 break-all">{post?.content}</p>
      <ImageFrame
        src={post.thumbnail_url}
        height={80}
        width={80}
        imgClassName="w-50"
        className="mt-3 flex justify-center rounded-xl bg-(--darker-foreground)"
        alt={""}
      />
      <div className="mt-2 inline-flex items-center gap-2 text-[16px] text-neutral-200">
        <div className="hidden [@media(min-width:500px)]:inline">Posted by</div>
        <ImageFrame
          src={post?.author.profile_url ? post.author.profile_url : "/default-avatar.png"}
          height={50}
          width={50}
          alt="user profile"
          imgClassName="border rounded-xl w-8 h-8 border-(--foreground) flex items-center justify-center bg-white"
        />
        <Link href={path.public.user.getHref(post.author_id)} className="hover:underline">
          {post.author.handler}
        </Link>{" "}
        <div className="text-sm text-neutral-400">• {timestampToDate(post.created_at)}</div>
      </div>
      <div className="mt-3 mb-4 flex justify-between">
        <LikeModify
          parentId={post.id}
          parentType="post"
          className="flex gap-2 rounded-xl bg-(--darker-foreground) p-2"
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
        <DeletePost post={post} />
        <UpdatePost postId={post.id} threadId={post.thread_id} />
      </div>
      <div className="mb-2 text-xl">Comments</div>
      <Comments rootId={postId} />
    </div>
  )
}
