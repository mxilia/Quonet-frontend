import { PostsList } from "@/features/posts/components/posts-list";
import { TopLikedPostsList } from "@/features/posts/components/top-liked-post-list";
import { FullThread } from "@/features/threads/components/full-thread";

const ThreadPage = async ({ params } : { params: Promise<{ id: string }>}) => {
  const threadId = (await params).id;
  return (
    <div className="bg-black min-h-screen pt-17 text-white flex justify-center">
      <div className="inline-flex flex-col w-150">
        <FullThread threadId={threadId} />
        <TopLikedPostsList threadId={threadId} />
        <PostsList threadId={threadId} />
      </div>
    </div>
  )
}

export default ThreadPage;