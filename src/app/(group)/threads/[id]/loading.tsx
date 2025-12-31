import { PostsListSkeleton } from "@/features/posts/components/skeletons/posts-list-skeleton"
import { TopLikedPostsListSkeleton } from "@/features/posts/components/skeletons/top-liked-posts-list-skeleton"
import { FullThreadSkeleton } from "@/features/threads/components/skeletons/full-thread-skeleton"

const ThreadLoading = () => {
  return (
    <div className="flex min-h-screen justify-center bg-black pt-17 text-white">
      <div className="inline-flex w-full flex-col pt-3 pr-4 pl-4 sm:w-150 sm:p-2">
        <FullThreadSkeleton />
        <TopLikedPostsListSkeleton />
        <PostsListSkeleton />
      </div>
    </div>
  )
}

export default ThreadLoading
