import { Post } from "@/types/api";
import { useTopLikedPosts } from "../api/get-top-liked-posts";
import { ImageFrame } from "@/components/ui/image-frame/image-frame";
import { path } from "@/config/path";
import Link from "next/link";

type TopLikedPostsList = {
  authorId?: string;
  threadId?: string;
  title?: string;
  limit?: number;
}

type SmallPostProps = {
  post: Post;
}

export const SmallPost = ({ post } : SmallPostProps ) => {
  return (
    <div className="bg-(--darker-foreground) p-2 rounded-xl border border-black hover:border-(--secondary)">
      <div className="inline-flex max-w-50 gap-2 mb-2">
        <ImageFrame src={"/temp.png"} width={40} height={40} className="flex aspect-square justify-center rounded-xl" imgClassName="aspect-square rounded-lg" alt="" />
        <div>
          <Link href={path.public.post.getHref(post.id)} className="line-clamp-1 hover:underline pr-2">{post.title}</Link>
          <p className="line-clamp-3 text-xs text-neutral-400 h-12 max-w-30 whitespace-pre-line">{post.content}</p>
        </div>
      </div>
      <div className="text-xs text-neutral-300 h-3">posted by {post.author.handler}</div>
      <Link href={path.public.post.getHref(post.id)} className="text-xs text-(--secondary) hover:underline">(view full)</Link>
    </div>
  )
}

export const TopLikedPostsList = ({ authorId, threadId, title, limit } : TopLikedPostsList) => {
  const topLikedPosts = useTopLikedPosts({ authorId, threadId, title, limit });
  if(topLikedPosts.isLoading) return <div>loading</div>;
  return (
    <div className="w-full">
      <h1 className="text-lg mb-2">Top Posts (Sorted by likes)</h1>
      <div className="inline-flex w-full gap-2">
        {
          topLikedPosts.data?.map((e) => <SmallPost key={e.id} post={e}/>)
        }
      </div>
    </div>
  )
}