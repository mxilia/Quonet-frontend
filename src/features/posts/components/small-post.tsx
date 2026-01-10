import { ImageFrame } from "@/components/ui/image-frame/image-frame"
import { path } from "@/config/path"
import { Post } from "@/types/api"
import Link from "next/link"

type SmallPostProps = {
  post: Post
}

export const SmallPost = ({ post }: SmallPostProps) => {
  return (
    <div className="inline-flex max-w-50 flex-col justify-between rounded-xl border border-black bg-(--darker-foreground) p-2 hover:border-(--secondary)">
      <div className="inline-flex max-w-50 gap-2">
        {post.thumbnail_url ? (
          <ImageFrame
            src={post.thumbnail_url}
            width={40}
            height={40}
            className="inline-flex aspect-square h-8 w-8 items-center justify-center gap-2 rounded-xl border border-neutral-500 object-contain"
            alt={""}
          />
        ) : (
          <div className="inline-flex aspect-square h-8 w-8 items-center justify-center gap-2 rounded-xl border border-neutral-500 bg-(--foreground) text-center text-[8px] text-neutral-400">
            no img
          </div>
        )}
        <div>
          <Link
            href={path.public.post.getHref(post.id)}
            className="line-clamp-1 pr-2 hover:underline"
          >
            {post.title}
          </Link>
          <p className="line-clamp-3 max-h-12 max-w-30 text-xs whitespace-pre-line text-neutral-400">
            {post.content}
          </p>
        </div>
      </div>
      <div className="mt-1 text-xs text-neutral-300">
        {`posted by `}
        <Link href={path.public.user.getHref(post.author.id)} className="hover:underline">
          {post.author.handler}
        </Link>
        <br />
        <Link
          href={path.public.post.getHref(post.id)}
          className="text-secondary text-xs hover:underline"
        >
          (view full)
        </Link>
      </div>
    </div>
  )
}
