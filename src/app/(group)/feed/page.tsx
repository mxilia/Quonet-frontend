import { getInfinitePostsQueryOptions } from "@/features/posts/api/get-posts"
import { PostsList } from "@/features/posts/components/posts-list"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Feed",
  description: "Feed page",
}

const FeedPage = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery(getInfinitePostsQueryOptions())
  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex min-h-screen w-full justify-center bg-black pt-17 text-white">
        <div className="sm:w-150 w-full px-2 sm:px-0 inline-flex justify-center">
          <PostsList />
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default FeedPage
