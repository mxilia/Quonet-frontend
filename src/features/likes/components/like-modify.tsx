'use client';

import { useUser } from "@/lib/auth";
import { CreateLikeInput, useCreateLike } from "../api/create-like";
import { useLikeState } from "../api/get-like-state";
import { useLikeCount } from "../api/get-like-count";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { Like, LikeCount, LikeState, User } from "@/types/api";

export type LikeModifyChildrenProps = {
  parentId: string;
  parentType: "post" | "comment";
  likeState: UseQueryResult<LikeState, Error>;
  user: UseQueryResult<User | null, Error>;
  createLike: UseMutationResult<Like, Error, { data: CreateLikeInput; }, unknown>;
  likeCount: UseQueryResult<LikeCount, Error>;
}

type LikeModifyProps = {
  parentId: string;
  parentType: "post" | "comment";
  children: ({ parentId, parentType, likeState, user, createLike, likeCount } : LikeModifyChildrenProps) => React.ReactNode;
  className?: string;
}

export const LikeModify = ({ parentId, parentType, children, className } : LikeModifyProps) => {
  const user = useUser();
  const likeState = useLikeState({ parentType, parentId });
  const likeCount = useLikeCount({ parentType, parentId });
  const createLike = useCreateLike();

  return (
    <div className={className}>
      { children({ parentId, parentType, likeState, user, createLike, likeCount }) }
    </div>
  );
}