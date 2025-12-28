'use client';

import Image from "next/image";
import { useThread } from "../api/get-thread";
import { Skeleton } from "@/components/ui/skeleton/skeleton";

type FullThreadProps = {
  threadId: string;
}

export const FullThread = ({ threadId } : FullThreadProps) => {
  const threadQuery = useThread({ threadId });
  if(threadQuery.isLoading) return (
    <div className="inline-flex flex-col w-full mt-3 mb-3 p-3 rounded-2xl bg-(--darker-foreground) border border-(--darker-foreground)">
      <div className="inline-flex items-center gap-3">
        <Skeleton className="h-15 w-15" />
        <Skeleton className="h-10 w-40"/>
      </div>
      <Skeleton className="mt-2 h-8 w-30"/>
      <Skeleton className="h-30 w-full t-2 mt-2 mb-2" />
    </div>
  );
  const thread = threadQuery.data;
  if(!thread) return <div>not found</div>;
  return (
    <div className="inline-flex flex-col w-full mt-3 mb-3 p-3 rounded-2xl bg-(--darker-foreground) border border-(--darker-foreground)">
       <div className="inline-flex items-center gap-3">
        { 
          thread.image_url === "" ? 
          <div className="rounded-full h-15 w-15 bg-(--foreground) text-[6px] inline-flex items-center justify-center"> no img </div> 
          :
          <Image src={thread.image_url} height={60} width={60} alt="thread img" className="rounded-full" />
        }
        <div className="text-3xl text-neutral-100 inline">{ thread.title }</div>
      </div>
      <div className="mt-2 text-2xl"> Description </div>
      <p className="whitespace-pre-line mt-2 text-[16px] text-neutral-300 mb-2">{ thread.description }</p>
    </div>
  );
}