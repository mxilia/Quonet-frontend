import { getPostQueryOptions } from "@/features/posts/api/get-post"
import { FullPost } from "@/features/posts/components/full-post"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Post",
  description: "Post page",
}

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const postId = (await params).id
  /*
    TODO 1: validate id
  */
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(getPostQueryOptions(postId))
  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex min-h-screen justify-center bg-black pt-17 text-white">
        <FullPost postId={postId} />
      </div>
    </HydrationBoundary>
  )
}

export default PostPage
