import { MediumPostSkeleton } from "./medium-post-skeleton"

export const PostsListSkeleton = () => {
  return (
    <div className="inline-flex w-full flex-col pt-3">
      <MediumPostSkeleton />
      <MediumPostSkeleton />
    </div>
  )
}
