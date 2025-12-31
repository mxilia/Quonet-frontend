import { PostsListSkeleton } from "@/features/posts/components/skeletons/posts-list-skeleton"

const FeedLoading = () => {
  return (
    <div className="flex min-h-screen justify-center gap-2 bg-black px-2 pt-17 text-white sm:px-0">
      <PostsListSkeleton />
    </div>
  )
}

export default FeedLoading
