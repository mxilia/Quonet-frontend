import { FullPostSkeleton } from "@/features/posts/components/skeletons/full-post-skeleton"

const PostLoading = () => {
  return (
    <div className="flex min-h-screen justify-center bg-black pt-17 text-white">
      <FullPostSkeleton />
    </div>
  )
}

export default PostLoading
