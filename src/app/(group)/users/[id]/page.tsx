import { PostsList } from "@/features/posts/components/posts-list"
import { TopLikedPostsList } from "@/features/posts/components/top-liked-post-list"
import { FullUser } from "@/features/users/components/full-user"
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
  return (
    <div className="flex min-h-screen justify-center bg-black pt-17 text-white">
      <div className="inline-flex w-full flex-col pt-3 pr-4 pl-4 sm:w-150 sm:p-2">
        <FullUser userId={userId} />
        <TopLikedPostsList authorId={userId} />
        <PostsList authorId={userId} />
      </div>
    </div>
  )
}

export default UserPage
