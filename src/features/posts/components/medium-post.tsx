"use client"

import { ImageFrame } from "@/components/ui/image-frame/image-frame"
import { path } from "@/config/path"
import { Post } from "@/types/api"
import Link from "next/link"
import Image from "next/image"
import { timestampToDate } from "@/utils/format"
import { LikeModify } from "@/features/likes/components/like-modify"
import { LikeButton } from "@/features/likes/components/like-button"
import { LikeCounter } from "@/features/likes/components/like-counter"
import { UpdatePost } from "./update-post"
import { ConfigurePost } from "./configure-post"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type MediumPostProps = {
  post: Post
}

export const MediumPost = ({ post }: MediumPostProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isClamped, setIsClamped] = useState(false)
  const [readMore, setReadMore] = useState(false)

  useEffect(() => {
    const e = ref.current
    if (!e) return
    setIsClamped(e.scrollHeight > e.clientHeight)
  }, [])

  return (
    <div className="border-foreground mt-5 inline-flex w-full flex-col rounded-xl border p-3 pt-3">
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
          <div className="bg-foreground inline-flex h-6 w-6 items-center justify-center rounded-md text-[6px]">
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
        <div className="text-secondary ml-2 inline text-sm hover:underline">
          {`/thread/${post.thread.title}`}
        </div>
      </Link>
      <p
        ref={ref}
        className={cn(
          "wwhitespace-pre-line mt-3 w-full max-w-150 text-[16px] wrap-break-word text-neutral-200",
          !readMore && "line-clamp-3",
        )}
      >
        {post.content}
      </p>
      {isClamped && (
        <span
          onClick={() => setReadMore(!readMore)}
          className="text-secondary text-[16px] hover:underline"
        >
          {readMore ? "show less" : "read more"}
        </span>
      )}
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
          className="hover:bg-foreground flex h-11 w-11 items-center justify-center rounded-xl bg-(--darker-foreground) pt-0.5 pb-1 transition-colors duration-200 select-none"
        >
          <Image src="/blue-chat.png" height={27} width={27} alt="comment img" />
        </Link>
        <ConfigurePost post={post} />
        <UpdatePost postId={post.id} threadId={post.thread_id} />
      </div>
    </div>
  )
}
