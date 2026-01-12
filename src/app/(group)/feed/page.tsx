import { getInfinitePostsQueryOptions } from "@/features/posts/api/get-posts"
import { PostsList } from "@/features/posts/components/posts-list"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { Metadata } from "next"
import { Activity } from "react"

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
      <div className="flex min-h-screen justify-center gap-2 bg-black px-2 pt-17 text-white sm:px-0">
        <div className="sm:w-150">
          <PostsList />
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default FeedPage
