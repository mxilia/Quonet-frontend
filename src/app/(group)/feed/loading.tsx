import { PostsListSkeleton } from "@/features/posts/components/skeletons/posts-list-skeleton"

const FeedLoading = () => {
  return (
    <div className="flex min-h-screen w-full justify-center bg-black pt-17 text-white">
      <div className="sm:w-150 w-full px-2 sm:px-0 inline-flex justify-center">
        <PostsListSkeleton />
      </div>
    </div>
  )
}

export default FeedLoading
