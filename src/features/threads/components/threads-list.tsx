import { Thread } from "@/types/api";
import { useInfiniteThreads } from "../api/get-threads"
import { DeleteThread } from "./delete-thread";
import Image from "next/image";
import Link from "next/link";
import { path } from "@/config/path";

type SmallThreadProps = {
  thread: Thread;
}

export const SmallThread = ({ thread } : SmallThreadProps) => {

  return (
    <>
      <Link href={path.public.thread.getHref(thread.id)}>
        <div className="inline-flex w-full p-2 rounded-xl items-center gap-2 bg-(--foreground)/30 border border-black hover:border-(--secondary)">
          { 
            thread.image_url === "" ? 
            <div className="rounded-xl h-8 w-8 bg-(--foreground) text-[8px] flex items-center justify-center"> no img </div> 
            :
            <Image src={thread.image_url} height={32} width={32} alt="thread img" className="rounded-xl" />
          }
          <div>{ thread.title }</div>
        </div>
      </Link>
      <DeleteThread threadId={thread.id} />
    </>
  );
}

export const ThreadList = () => {
  const threadsQuery = useInfiniteThreads();
  if(threadsQuery.isLoading) return <div> loading.. </div> ;

  const threads = threadsQuery.data?.pages.flatMap((page) => page.data);

  return (
    <div className="w-full inline-flex flex-col mt-2 grow">
      <h1 className="text-xl w-full mb-2">Topics you might like</h1>
      <div className="inline-flex flex-col grow gap-1 w-full overflow-y-scroll no-scrollbar">
        {
          threads?.map((e) => (<SmallThread key={`list-${e.id}`} thread={e}/>))
        }
      </div>
      {threads && threads?.length > 0 && threadsQuery.hasNextPage ? <div onClick={() => threadsQuery.fetchNextPage()} className="mt-1 text-xs text-neutral-400">load more</div> : null}
    </div>
  );
}