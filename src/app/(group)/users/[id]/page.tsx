import { PostsList } from "@/features/posts/components/posts-list";
import { TopLikedPostsList } from "@/features/posts/components/top-liked-post-list";
import { FullUser } from "@/features/users/components/full-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User",
  description: "Home page",
};


const UserPage = async ({ params } : { params: Promise<{ id: string }>}) => {
  const userId = (await params).id;
  /*
    TODO 1: validate id
  */
  return (
    <div className="bg-black min-h-screen pt-17 text-white flex justify-center">
      <div className="inline-flex flex-col w-full sm:w-150 sm:p-2 pl-4 pr-4 pt-3">
        <FullUser userId={userId} />
        <TopLikedPostsList authorId={userId} />
        <PostsList authorId={userId} />
      </div>
    </div>
  )
}

export default UserPage;