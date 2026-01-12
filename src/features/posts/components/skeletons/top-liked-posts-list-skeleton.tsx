import { SmallPostSkeleton } from "./small-post-skeleton"

export const TopLikedPostsListSkeleton = () => {
  return (
    <div className="w-full">
      <h1 className="mb-2 text-lg">Top Posts (Sorted by likes)</h1>
      <div className="grid grid-cols-3 w-full gap-2">
        <SmallPostSkeleton />
        <SmallPostSkeleton />
        <SmallPostSkeleton />
      </div>
    </div>
  )
}
