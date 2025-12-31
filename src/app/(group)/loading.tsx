import { TopLikedPostsListSkeleton } from "@/features/posts/components/skeletons/top-liked-posts-list-skeleton"
import { ThreadsListSkeleton } from "@/features/threads/components/skeletons/threads-list-skeleton"
import { CreatePostTabSkeleton } from "./_components/skeletons/create-post-tab-skeleton"
import { AnnouncementsListSkeleton } from "@/features/announcements/components/skeletons/announcements-list-skeleton"

const HomeLoading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-black pt-22 text-white">
      <div className="flex w-full grow flex-col items-center pr-4 pl-4 sm:w-150 sm:p-2">
        <CreatePostTabSkeleton />
        <AnnouncementsListSkeleton />
        <TopLikedPostsListSkeleton />
        <ThreadsListSkeleton />
      </div>
    </div>
  )
}

export default HomeLoading
