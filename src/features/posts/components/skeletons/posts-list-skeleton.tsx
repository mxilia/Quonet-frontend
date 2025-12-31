import { MediumPostSkeleton } from "./medium-post-skeleton"

export const PostsListSkeleton = () => {
  return (
    <div className="inline-flex w-full flex-col pt-3 sm:w-150">
      <MediumPostSkeleton />
      <MediumPostSkeleton />
    </div>
  )
}
