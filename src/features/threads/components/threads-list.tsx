"use client"

import { Thread } from "@/types/api"
import { useInfiniteThreads } from "../api/get-threads"
import { DeleteThread } from "./delete-thread"
import Image from "next/image"
import Link from "next/link"
import { path } from "@/config/path"
import { useDebounce } from "@/utils/debounce"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton/skeleton"

type SmallThreadProps = {
  thread: Thread
}

export const SmallThread = ({ thread }: SmallThreadProps) => {
  return (
    <>
      <Link href={path.public.thread.getHref(thread.id)}>
        <div className="inline-flex w-full items-center gap-2 rounded-xl border border-black bg-(--foreground)/30 p-2 hover:border-(--secondary)">
          {thread.image_url === "" ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-(--foreground) text-[8px]">
              {" "}
              no img{" "}
            </div>
          ) : (
            <Image
              src={thread.image_url}
              height={32}
              width={32}
              alt="thread img"
              className="rounded-xl"
            />
          )}
          <div>{thread.title}</div>
        </div>
      </Link>
      <DeleteThread threadId={thread.id} />
    </>
  )
}

const SmallThreadSkeleton = () => {
  return (
    <div>
      <div className="inline-flex w-full items-center gap-2 rounded-xl border border-black bg-(--foreground)/30 p-2 hover:border-(--secondary)">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-5 w-50" />
      </div>
    </div>
  )
}

export const ThreadList = () => {
  const [searchString, setSearchString] = useState("")
  const debouncedSearch = useDebounce(searchString, 300)

  const threadsQuery = useInfiniteThreads({ title: debouncedSearch })
  const threads = threadsQuery.data?.pages.flatMap((page) => page.data)

  if (threadsQuery.isLoading)
    return (
      <div className="mt-2 inline-flex w-full grow flex-col">
        <h1 className="mb-1 w-full text-xl">Topics you might like</h1>
        <input
          placeholder="Search for thread?"
          className="mt-1 mr-10 mb-2 w-full rounded-lg border border-(--foreground) bg-neutral-950 p-1 px-3 text-sm"
          type="text"
          onChange={(e) => {
            setSearchString(e.target.value)
          }}
        />
        <div className="no-scrollbar inline-flex w-full grow flex-col gap-1 overflow-y-scroll">
          <SmallThreadSkeleton />
          <SmallThreadSkeleton />
          <SmallThreadSkeleton />
          <SmallThreadSkeleton />
        </div>
      </div>
    )

  return (
    <div className="mt-2 inline-flex w-full grow flex-col">
      <h1 className="mb-1 w-full text-xl">Topics you might like</h1>
      <input
        placeholder="Search for thread?"
        className="mt-1 mr-10 mb-2 w-full rounded-lg border border-(--foreground) bg-neutral-950 p-1 px-3 text-sm"
        type="text"
        onChange={(e) => {
          setSearchString(e.target.value)
        }}
      />
      <div className="no-scrollbar inline-flex w-full grow flex-col gap-1 overflow-y-scroll">
        {!threads || threads.length === 0 ? (
          <div className="text-sm text-neutral-500">no threads found</div>
        ) : (
          threads?.map((e) => <SmallThread key={`list-${e.id}`} thread={e} />)
        )}
      </div>
      {threads && threads?.length > 0 && threadsQuery.hasNextPage ? (
        <div onClick={() => threadsQuery.fetchNextPage()} className="mt-1 text-xs text-neutral-400">
          load more
        </div>
      ) : null}
    </div>
  )
}
