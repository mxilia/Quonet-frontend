import { PostsList } from "@/features/posts/components/posts-list"
import { Metadata } from "next"
import { Activity } from "react"

export const metadata: Metadata = {
  title: "Feed",
  description: "Feed page",
}

const FeedPage = () => {
  return (
    <div className="flex min-h-screen justify-center gap-2 bg-black px-2 pt-17 text-white sm:px-0">
      <Activity>
        <PostsList />
      </Activity>
    </div>
  )
}

export default FeedPage
