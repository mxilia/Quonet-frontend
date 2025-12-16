'use client';
import { PostsList } from "@/features/posts/components/posts-list";
import { ThreadList } from "@/features/threads/components/threads-list";

const FeedPage = () => {
  return (
    <>
      <div className="bg-black min-h-screen pt-17 text-white flex gap-2 justify-center">
        <PostsList authorId={""} threadId={""} title={""} />
      </div>
      <div className="fixed right-0 top-17 text-white w-90 pt-3 h-screen border-l border-(--foreground) pl-2.5">
        <ThreadList />
      </div>
    </>
  )
}

export default FeedPage;