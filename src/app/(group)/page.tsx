import { AnnouncementsList } from "@/features/announcements/components/announcements-list"
import { TopLikedPostsList } from "@/features/posts/components/top-liked-post-list"
import { ThreadList } from "@/features/threads/components/threads-list"
import { CreatePostTab } from "./_components/create-post-tab"
import { getUserQueryOptions } from "@/lib/auth"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

const Home = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(getUserQueryOptions())
  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex min-h-screen flex-col items-center bg-black pt-22 text-white">
        <div className="flex w-full grow flex-col items-center pr-4 pl-4 sm:w-150 sm:p-2">
          <CreatePostTab />
          <AnnouncementsList />
          <TopLikedPostsList />
          <ThreadList />
        </div>
      </div>
    </HydrationBoundary>
  )
}
export default Home
