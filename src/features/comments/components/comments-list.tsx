"use client"

import { useState } from "react"
import { useInfiniteComments } from "../api/get-comments"
import { Comment } from "@/types/api"
import Image from "next/image"
import { LikeModify } from "@/features/likes/components/like-modify"
import { useUser } from "@/lib/auth"
import { LikeButton } from "@/features/likes/components/like-button"
import { LikeCounter } from "@/features/likes/components/like-counter"
import Link from "next/link"
import { path } from "@/config/path"
import { DeleteComment } from "./delete-comment"

type CommentBox = {
  comment: Comment
  rootId: string
  depth: number
  setHandler: (e: string) => void
  setIsReplying: (e: boolean) => void
  setParentId: (e: string) => void
}

type CommentsListProps = {
  authorId?: string
  parentId?: string
  rootId: string
  depth: number
  setHandler: (e: string) => void
  setIsReplying: (e: boolean) => void
  setParentId: (e: string) => void
}

const CommentBox = ({
  comment,
  rootId,
  depth,
  setHandler,
  setIsReplying,
  setParentId,
}: CommentBox) => {
  const [showMore, setShowMore] = useState(false)
  return (
    <div className="w-full pt-2">
      <div className="inline-flex items-stretch gap-2">
        <div className="flex shrink-0 flex-col items-center pt-1.5">
          <Image
            src={
              comment.author && comment.author.profile_url
                ? comment.author.profile_url
                : "/default-avatar.png"
            }
            height={32}
            width={32}
            alt="user profile"
            className="border-foreground flex w-8 items-center justify-center rounded-2xl border bg-white"
          />
          {showMore && false && <div className="bg-foreground mt-1 w-px flex-1"></div>}
        </div>

        <div className="flex flex-1 flex-col">
          <Link
            href={path.public.user.getHref(comment.author_id ?? "")}
            className="w-fit text-sm text-neutral-200 hover:underline"
          >
            {comment.author && comment.author ? comment.author.handler : "Deleted User"}
          </Link>
          <p className="text-md max-w-200 wrap-break-word whitespace-normal text-neutral-100">
            {comment.content}
          </p>
          <div className="flex items-center gap-2">
            <LikeModify parentId={comment.id} parentType="comment" className="flex gap-2">
              {({ parentId, parentType, likeState, user, createLike, likeCount }) => (
                <>
                  <LikeButton
                    parentId={parentId}
                    parentType={parentType}
                    createLike={createLike}
                    likeState={likeState}
                    user={user}
                    value={true}
                    className="h-0 w-0 border-r-6 border-b-8 border-l-6 border-r-transparent border-b-neutral-200 border-l-transparent"
                    activatedClassName="w-0 h-0 
                              border-l-6 border-l-transparent
                              border-r-6 border-r-transparent
                              border-b-8 border-b-(--secondary)"
                  />
                  <LikeCounter likeCount={likeCount} className="text-secondary text-xs" />
                  <LikeButton
                    parentId={parentId}
                    parentType={parentType}
                    createLike={createLike}
                    likeState={likeState}
                    user={user}
                    value={false}
                    className="h-0 w-0 border-t-8 border-r-6 border-l-6 border-t-neutral-200 border-r-transparent border-l-transparent"
                    activatedClassName="w-0 h-0 
                              border-l-6 border-l-transparent
                              border-r-6 border-r-transparent
                              border-t-8 border-t-(--secondary)"
                  />
                </>
              )}
            </LikeModify>
            <div
              className="text-secondary text-xs"
              onClick={() => {
                setIsReplying(true)
                setParentId(comment.id)
                setHandler(
                  comment.author && comment.author ? comment.author.handler : "Deleted User",
                )
              }}
            >
              reply
            </div>
            <DeleteComment comment={comment} />
          </div>
          <div onClick={() => setShowMore(!showMore)} className="text-xs text-neutral-400">
            {showMore ? `show less` : `show more`}
          </div>
        </div>
      </div>

      {showMore && (
        <CommentsList
          parentId={comment.id}
          rootId={rootId}
          depth={depth + 1}
          setHandler={setHandler}
          setIsReplying={setIsReplying}
          setParentId={setParentId}
        />
      )}
    </div>
  )
}

export const CommentsList = ({
  authorId,
  parentId,
  rootId,
  depth,
  setHandler,
  setIsReplying,
  setParentId,
}: CommentsListProps) => {
  const commentsQuery = useInfiniteComments({ authorId, parentId, rootId })
  const user = useUser()

  if (commentsQuery.isLoading || user.isLoading)
    return <div className="pl-11 text-xs text-neutral-500">loading</div>

  const comments = commentsQuery.data?.pages.flatMap((page) => page.data)
  return (
    <div className={"inline-flex w-full flex-col gap-3" + (depth > 0 ? " pl-8" : "")}>
      {depth === 0 && (
        <div
          onClick={() => {
            setIsReplying(true)
            setParentId("")
            setHandler("original post")
          }}
          className="mb-2 flex gap-2"
        >
          <Image
            src={user.data?.profile_url ? user.data.profile_url : "/default-avatar.png"}
            height={18}
            width={18}
            alt="user profile"
            className="flex h-8 w-8 items-center justify-center rounded-2xl border bg-white"
          />
          <div className="text-foreground w-full rounded-xl bg-neutral-800 p-1 pt-[5px] pl-4 text-sm transition-colors duration-300 hover:bg-neutral-500">
            Reply
          </div>
        </div>
      )}
      {comments?.map((e) => (
        <CommentBox
          key={e.id}
          comment={e}
          rootId={rootId}
          depth={depth}
          setHandler={setHandler}
          setIsReplying={setIsReplying}
          setParentId={setParentId}
        />
      ))}
      {comments && comments.length > 0 && commentsQuery.hasNextPage && (
        <div className="text-md text-neutral-300" onClick={() => commentsQuery.fetchNextPage()}>
          load more
        </div>
      )}
    </div>
  )
}
