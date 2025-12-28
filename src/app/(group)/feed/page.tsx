import { PostsList } from "@/features/posts/components/posts-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed",
  description: "Feed page",
};


const FeedPage = () => {
  return (
    <div className="bg-black min-h-screen pt-17 text-white flex gap-2 justify-center">
      <PostsList />
    </div>
  )
}

export default FeedPage;