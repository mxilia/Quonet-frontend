import { getInfinitePostsQueryOptions } from "@/features/posts/api/get-posts"
import { getTopLikedPostsQueryOptions } from "@/features/posts/api/get-top-liked-posts"
import { PostsList } from "@/features/posts/components/posts-list"
import { TopLikedPostsList } from "@/features/posts/components/top-liked-post-list"
import { getThreadQueryOptions } from "@/features/threads/api/get-thread"
import { FullThread } from "@/features/threads/components/full-thread"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thread",
  description: "Home page",
}

const ThreadPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const threadId = (await params).id

  const queryClient = new QueryClient()
  await Promise.all([
    queryClient.prefetchQuery(getThreadQueryOptions(threadId)),
    queryClient.prefetchQuery(getTopLikedPostsQueryOptions(undefined, threadId)),
    queryClient.prefetchInfiniteQuery(getInfinitePostsQueryOptions(undefined, threadId)),
  ])
  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex min-h-screen justify-center bg-black pt-17 text-white">
        <div className="inline-flex w-full flex-col pt-3 pr-4 pl-4 sm:w-150 sm:p-2">
          <FullThread threadId={threadId} />
          <TopLikedPostsList threadId={threadId} />
          <PostsList threadId={threadId} />
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default ThreadPage
