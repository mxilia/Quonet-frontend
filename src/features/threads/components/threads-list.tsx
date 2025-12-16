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
    <Link href={path.public.thread.getHref(thread.id)}>
      <div className="inline-flex w-[80%] p-2 rounded-xl items-center gap-2 hover:bg-(--foreground)/30">
        { 
          thread.image_url === "" ? 
          <div className="rounded-xl h-8 w-8 bg-neutral-700 text-[8px] flex items-center justify-center"> no img </div> 
          :
          <Image src={thread.image_url} height={32} width={32} alt="thread img" className="rounded-xl" />
        }
        <div>{ thread.title }</div>
        <DeleteThread threadId={thread.id} />
      </div>
    </Link>
  );
}

export const ThreadList = () => {
  const threadsQuery = useInfiniteThreads();
  if(threadsQuery.isLoading) return <div> loading.. </div> ;

  const threads = threadsQuery.data?.pages.flatMap((page) => page.data);

  return (
    <div>
      <h1 className="text-xl font-semibold w-full">Topic you might like</h1>
      <div className="inline-flex flex-col gap-1 w-full">
        {
          threads?.map((e) => (<SmallThread key={e.id} thread={e}/>))
        }
      </div>
    </div>
  );
}