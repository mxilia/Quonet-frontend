'use client';

import { useState } from "react";
import { useInfiniteComments } from "../api/get-comments";
import { Comment } from "@/types/api";
import Image from "next/image";
import { LikeModify } from "@/features/likes/components/like-modify";
import { useUser } from "@/lib/auth";
import { LikeButton } from "@/features/likes/components/like-button";
import { LikeCounter } from "@/features/likes/components/like-counter";

type CommentBox = {
  comment: Comment;
  rootId: string;
  depth: number;
  setHandler: (e : string) => void;
  setIsReplying: (e : boolean) => void;
  setParentId: (e : string) => void;
}

type CommentsListProps = {
  authorId?: string;
  parentId?: string;
  rootId: string;
  depth: number;
  setHandler: (e : string) => void;
  setIsReplying: (e : boolean) => void;
  setParentId: (e : string) => void;
}

const CommentBox = ({ comment, rootId, depth, setHandler, setIsReplying, setParentId } : CommentBox) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="w-full pt-2">

      <div className="flex items-stretch gap-2">
        <div className="flex flex-col items-center pt-1.5 shrink-0">
          <Image src={ comment.author.profile_url ? comment.author.profile_url : "/default-avatar.png"} height={32} width={32} alt="user profile" className="border rounded-2xl w-8 flex items-center justify-center bg-white"/>
          {showMore && <div className="mt-1 flex-1 w-px bg-(--foreground)"></div>}
        </div>

        <div className="flex flex-col flex-1">
          <div className="text-neutral-200 text-sm">{comment.author.handler}</div>
          <p className="whitespace-pre-line text-md text-neutral-100">{ comment.content }</p>
          <div className="flex gap-2">
            <LikeModify parentId={comment.id} parentType="comment" className="flex gap-2">
              {
                ({ parentId, parentType, likeState, user, createLike, likeCount }) => 
                <>
                  <LikeButton 
                    parentId={parentId} 
                    parentType={parentType} 
                    createLike={createLike} 
                    likeState={likeState} 
                    user={user} value={true} 
                    className="text-xs text-neutral-300"
                  />
                  <LikeCounter likeCount={likeCount} className="text-xs text-(--secondary)" />
                  <LikeButton 
                    parentId={parentId} 
                    parentType={parentType} 
                    createLike={createLike} 
                    likeState={likeState} 
                    user={user} value={false} 
                    className="text-xs text-neutral-300"
                  />
                </>
              }
            </LikeModify>
            <div className="text-xs text-(--secondary)" onClick={() => {
              setIsReplying(true);
              setParentId(comment.id);
              setHandler(comment.author.handler);
            }}>
              reply
            </div>
          </div>
          <div onClick={() => setShowMore(!showMore)} className="text-xs text-neutral-400">{showMore ? `show less` : `show more`}</div>
        </div>
      </div>
      
      {showMore && <CommentsList  
                      parentId={comment.id} 
                      rootId={rootId} 
                      depth={depth+1}
                      setHandler={setHandler}
                      setIsReplying={setIsReplying} 
                      setParentId={setParentId}
                    />
      }
    </div>
  )
}

export const CommentsList = ({ authorId, parentId, rootId, depth, setHandler, setIsReplying, setParentId } : CommentsListProps) => {
  const commentsQuery = useInfiniteComments({ authorId, parentId, rootId });
  const user = useUser();

  if(commentsQuery.isLoading || user.isLoading) return <div className="pl-11 text-xs">loading</div>;
  
  const comments = commentsQuery.data?.pages.flatMap((page) => page.data);
  return (
    <div className={"flex flex-col gap-3" + (depth>0 ? " pl-8" : "")}>
      {depth === 0 && 
        <div onClick={() => {setIsReplying(true); setParentId(""); setHandler("original post")}} className="flex gap-2 mb-2">
          <Image src={ user.data?.profile_url ? user.data.profile_url : "/default-avatar.png"} height={16} width={16} alt="user profile" className="border rounded-2xl w-[30px] h-[30px] flex items-center justify-center bg-white"/>
          <div className="p-1 pl-4 bg-(--darker-foreground) rounded-2xl text-(--foreground) w-full">
            Reply
          </div>
        </div>
      }
      {comments?.map((e) => <CommentBox key={e.id} comment={e} rootId={rootId} depth={depth} setHandler={setHandler} setIsReplying={setIsReplying} setParentId={setParentId} />)}
      {comments && comments.length > 0 && commentsQuery.hasNextPage && <div className="text-md" onClick={() => commentsQuery.fetchNextPage()}>load more</div> }
    </div>
  );
}