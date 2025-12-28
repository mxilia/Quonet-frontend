import { FullPost } from "@/features/posts/components/full-post";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post",
  description: "Post page",
};

const PostPage = async ({ params } : { params: Promise<{ id: string }>}) => {
  const postId = (await params).id;
  /*
    TODO 1: validate id
  */
  return (
    <div className="bg-black min-h-screen pt-17 text-white flex justify-center">
      <FullPost postId={postId}/>
    </div>
  )
}

export default PostPage;