"use client"

import Image from "next/image"
import { useThread } from "../api/get-thread"
import { Skeleton } from "@/components/ui/skeleton/skeleton"

type FullThreadProps = {
  threadId: string
}

export const FullThread = ({ threadId }: FullThreadProps) => {
  const threadQuery = useThread({ threadId })
  if (threadQuery.isLoading)
    return (
      <div className="mt-3 mb-3 inline-flex w-full flex-col rounded-2xl border border-(--darker-foreground) bg-(--darker-foreground) p-3">
        <div className="inline-flex items-center gap-3">
          <Skeleton className="h-15 w-15" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="mt-2 h-8 w-30" />
        <Skeleton className="t-2 mt-2 mb-2 h-30 w-full" />
      </div>
    )
  const thread = threadQuery.data
  if (!thread) return <div>not found</div>
  return (
    <div className="mt-3 mb-3 inline-flex w-full flex-col rounded-2xl border border-(--darker-foreground) bg-(--darker-foreground) p-3">
      <div className="inline-flex items-center gap-3">
        {thread.image_url === "" ? (
          <div className="inline-flex h-15 w-15 items-center justify-center rounded-full bg-(--foreground) text-[6px]">
            {" "}
            no img{" "}
          </div>
        ) : (
          <Image
            src={thread.image_url}
            height={60}
            width={60}
            alt="thread img"
            className="rounded-full"
          />
        )}
        <div className="inline text-3xl text-neutral-100">{thread.title}</div>
      </div>
      <div className="mt-2 text-2xl"> Description </div>
      <p className="mt-2 mb-2 text-[16px] whitespace-pre-line text-neutral-300">
        {thread.description}
      </p>
    </div>
  )
}
