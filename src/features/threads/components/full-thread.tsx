'use client';

import Image from "next/image";
import { useThread } from "../api/get-thread";

type FullThreadProps = {
  threadId: string;
}

export const FullThread = ({ threadId } : FullThreadProps) => {
  const threadQuery = useThread({ threadId });
  if(threadQuery.isLoading) return <div>loading</div>;
  const thread = threadQuery.data;
  if(!thread) return <div>not found</div>;
  return (
    <div className="inline-flex flex-col w-full pt-3">
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