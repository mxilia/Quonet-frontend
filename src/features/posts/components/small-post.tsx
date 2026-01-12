import { ImageFrame } from "@/components/ui/image-frame/image-frame"
import { path } from "@/config/path"
import { Post } from "@/types/api"
import Link from "next/link"

type SmallPostProps = {
  post: Post
}

export const SmallPost = ({ post }: SmallPostProps) => {
  return (
    <div className="hover:border-secondary inline-flex w-full flex-col justify-between rounded-xl border border-black bg-(--darker-foreground) p-2">
      <div className="inline-flex max-w-50 gap-2">
        {post.thumbnail_url ? (
          <ImageFrame
            src={post.thumbnail_url}
            width={40}
            height={40}
            className="inline-flex aspect-square h-8 w-8 items-center justify-center gap-2 overflow-hidden rounded-xl border border-neutral-500"
            alt={""}
          />
        ) : (
          <div className="bg-foreground inline-flex aspect-square h-8 w-8 items-center justify-center gap-2 rounded-xl border border-neutral-500 text-center text-[8px] text-neutral-400">
            no img
          </div>
        )}
        <div>
          <Link
            href={path.public.post.getHref(post.id)}
            className="line-clamp-1 max-w-15 overflow-hidden pr-2 hover:underline"
          >
            {post.title}
          </Link>
          <p className="line-clamp-3 hidden h-12 max-w-30 text-xs whitespace-pre-line text-neutral-400 sm:block">
            {post.content}
          </p>
        </div>
      </div>
      <p className="mt-1 line-clamp-3 block h-12 max-w-30 text-xs whitespace-pre-line text-neutral-400 sm:hidden">
        {post.content}
      </p>
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
