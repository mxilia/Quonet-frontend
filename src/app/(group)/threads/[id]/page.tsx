import { PostsList } from "@/features/posts/components/posts-list"
import { TopLikedPostsList } from "@/features/posts/components/top-liked-post-list"
import { FullThread } from "@/features/threads/components/full-thread"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thread",
  description: "Home page",
}

const ThreadPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const threadId = (await params).id
  return (
    <div className="flex min-h-screen justify-center bg-black pt-17 text-white">
      <div className="inline-flex w-full flex-col pt-3 pr-4 pl-4 sm:w-150 sm:p-2">
        <FullThread threadId={threadId} />
        <TopLikedPostsList threadId={threadId} />
        <PostsList threadId={threadId} />
      </div>
    </div>
  )
}

export default ThreadPage
