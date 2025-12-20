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
    <div className="w-full">
      <div className="flex items-center gap-3">
        <Image src={ comment.author.profile_url ? comment.author.profile_url : "/default-avatar.png"} height={16} width={16} alt="user profile" className="border rounded-2xl w-8 h-8 flex items-center justify-center bg-white"/>
        <div>
          <div>{comment.author.handler}</div>
          <p className="whitespace-pre-line text-sm text-neutral-200">{ comment.content }</p>
        </div>
      </div>
      <div className="flex">
        <div className="text-xs" onClick={() => {
          setIsReplying(true);
          setParentId(comment.id);
          setHandler(comment.author.handler);
        }}>reply</div>
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
                className=""
              />
              <LikeCounter likeCount={likeCount} />
              <LikeButton 
                parentId={parentId} 
                parentType={parentType} 
                createLike={createLike} 
                likeState={likeState} 
                user={user} value={false} 
                className=""
              />
            </>
          }
        </LikeModify>
      </div>
      <div onClick={() => setShowMore(!showMore)} className="text-sm">{showMore ? `show less` : `show more`}</div>
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
  const { data: user, isLoading, error } = useUser();

  if(commentsQuery.isLoading) return <div>loading</div>;
  if(isLoading) return <div>loading</div>;
  
  const comments = commentsQuery.data?.pages.flatMap((page) => page.data)

  return (
    <div className={"flex flex-col gap-3 " + (depth>0 ? " pl-8" : "")}>
      {depth === 0 && 
        <div onClick={() => {setIsReplying(true); setParentId(""); setHandler("original post")}} className="flex gap-2 mb-2">
          <Image src={ user?.profile_url ? user.profile_url : "/default-avatar.png"} height={16} width={16} alt="user profile" className="border rounded-2xl w-[30px] h-[30px] flex items-center justify-center bg-white"/>
          <div className="p-1 pl-4 bg-(--darker-foreground) rounded-2xl text-(--foreground) w-full">
            Reply
          </div>
        </div>
      }
      {comments?.map((e) => <CommentBox key={e.id} comment={e} rootId={rootId} depth={depth} setHandler={setHandler} setIsReplying={setIsReplying} setParentId={setParentId} />)}
    </div>
  );
}