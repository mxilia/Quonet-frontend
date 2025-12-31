import { SmallThreadSkeleton } from "./small-thread-skeleton"

export const ThreadsListSkeleton = () => {
  return (
    <div className="mt-2 inline-flex w-full grow flex-col">
      <h1 className="mb-1 w-full text-xl">Topics you might like</h1>
      <input
        placeholder="Search for thread?"
        className="mt-1 mr-10 mb-2 w-full rounded-lg border border-(--foreground) bg-neutral-950 p-1 px-3 text-sm"
        type="text"
      />
      <div className="no-scrollbar inline-flex w-full grow flex-col gap-1 overflow-y-scroll">
        <SmallThreadSkeleton />
        <SmallThreadSkeleton />
        <SmallThreadSkeleton />
        <SmallThreadSkeleton />
      </div>
    </div>
  )
}
