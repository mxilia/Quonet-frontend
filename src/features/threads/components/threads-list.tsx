"use client"

import { useInfiniteThreads } from "../api/get-threads"
import { useDebounce } from "@/utils/debounce"
import { useState } from "react"
import { ThreadsListSkeleton } from "./skeletons/threads-list-skeleton"
import { SmallThread } from "./small-thread"
import { SmallThreadSkeleton } from "./skeletons/small-thread-skeleton"

export const ThreadList = () => {
  const [searchString, setSearchString] = useState("")
  const debouncedSearch = useDebounce(searchString, 300)

  const threadsQuery = useInfiniteThreads({ title: debouncedSearch })
  const threads = threadsQuery.data?.pages.flatMap((page) => page.data)

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
      {threadsQuery.isFetching && <div className="no-scrollbar inline-flex w-full grow flex-col gap-1 overflow-y-scroll">
        <SmallThreadSkeleton />
        <SmallThreadSkeleton />
        <SmallThreadSkeleton />
        <SmallThreadSkeleton />
      </div>}
      {!threadsQuery.isFetching && <div className="no-scrollbar inline-flex w-full grow flex-col gap-1 overflow-y-scroll">
        {!threads || threads.length === 0 ? (
          <div className="text-sm text-neutral-500">no threads found</div>
        ) : (
          threads?.map((e) => <SmallThread key={`list-${e.id}`} thread={e} />)
        )}
      </div>}
      {threads && threads?.length > 0 && threadsQuery.hasNextPage ? (
        <div onClick={() => threadsQuery.fetchNextPage()} className="mt-1 text-xs text-neutral-400">
          load more
        </div>
      ) : null}
    </div>
  )
}
