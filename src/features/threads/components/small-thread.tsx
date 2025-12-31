import { path } from "@/config/path"
import { Thread } from "@/types/api"
import Link from "next/link"
import { DeleteThread } from "./delete-thread"
import Image from "next/image"

export type SmallThreadProps = {
  thread: Thread
}

export const SmallThread = ({ thread }: SmallThreadProps) => {
  return (
    <>
      <Link href={path.public.thread.getHref(thread.id)}>
        <div className="inline-flex w-full items-center gap-2 rounded-xl border border-black bg-(--foreground)/30 p-2 hover:border-(--secondary)">
          {thread.image_url === "" ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-(--foreground) text-[8px]">
              {" "}
              no img{" "}
            </div>
          ) : (
            <Image
              src={thread.image_url}
              height={32}
              width={32}
              alt="thread img"
              className="rounded-xl"
            />
          )}
          <div>{thread.title}</div>
        </div>
      </Link>
      <DeleteThread threadId={thread.id} />
    </>
  )
}
