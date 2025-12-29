import { PostsList } from "@/features/posts/components/posts-list";
import { TopLikedPostsList } from "@/features/posts/components/top-liked-post-list";
import { FullThread } from "@/features/threads/components/full-thread";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thread",
  description: "Home page",
};


const ThreadPage = async ({ params } : { params: Promise<{ id: string }>}) => {
  const threadId = (await params).id;
  return (
    <div className="bg-black min-h-screen pt-17 text-white flex justify-center">
      <div className="inline-flex flex-col w-full sm:w-150 sm:p-2 pl-4 pr-4 pt-3">
        <FullThread threadId={threadId} />
        <TopLikedPostsList threadId={threadId} />
        <PostsList threadId={threadId} />
      </div>
    </div>
  )
}

export default ThreadPage;