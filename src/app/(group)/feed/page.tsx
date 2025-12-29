import { PostsList } from "@/features/posts/components/posts-list";
import { Metadata } from "next";
import { Activity } from "react";

export const metadata: Metadata = {
  title: "Feed",
  description: "Feed page",
};


const FeedPage = () => {
  return (
    <div className="bg-black min-h-screen pt-17 text-white sm:px-0 px-2 flex gap-2 justify-center">
      <Activity>
        <PostsList />
      </Activity>
    </div>
  )
}

export default FeedPage;