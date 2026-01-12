import { PostsListSkeleton } from "@/features/posts/components/skeletons/posts-list-skeleton"

const FeedLoading = () => {
  return (
    <div className="flex min-h-screen justify-center gap-2 bg-black px-2 pt-17 text-white sm:px-0">
      <div className="sm:w-150">
        <PostsListSkeleton />
      </div>
    </div>
  )
}

export default FeedLoading
