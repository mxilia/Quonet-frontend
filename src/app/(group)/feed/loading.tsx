import { PostsListSkeleton } from "@/features/posts/components/skeletons/posts-list-skeleton"

const FeedLoading = () => {
  return (
    <div className="flex min-h-screen w-full justify-center bg-black pt-17 text-white">
      <div className="inline-flex w-full justify-center px-2 sm:w-150 sm:px-0">
        <PostsListSkeleton />
      </div>
    </div>
  )
}

export default FeedLoading
