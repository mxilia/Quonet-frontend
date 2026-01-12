import { PostsList } from "@/features/posts/components/posts-list"
import { TopLikedPostsList } from "@/features/posts/components/top-liked-post-list"
import { getUserById, getUserByIdQueryOptions } from "@/features/users/api/get-user"
import { FullUser } from "@/features/users/components/full-user"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "User",
  description: "Home page",
}

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const userId = (await params).id
  /*
    TODO 1: validate id
  */
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(getUserByIdQueryOptions(userId))
  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex min-h-screen justify-center bg-black pt-17 text-white">
        <div className="inline-flex w-full flex-col p-2 pt-3 sm:w-150">
          <FullUser userId={userId} />
          <TopLikedPostsList authorId={userId} />
          <PostsList authorId={userId} />
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default UserPage
