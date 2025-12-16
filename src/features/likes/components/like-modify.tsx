'use client';

import { useUser } from "@/lib/auth";
import { useCreateLike } from "../api/create-like";
import { useLikeCount } from "../api/get-like-count";
import { canCreateLike } from "@/lib/authorization";

type LikeModifyProps = {
  parentId: string;
  parentType: "post" | "comment";
}

export const LikeModify = ({ parentId, parentType } : LikeModifyProps) => {
  const { data: user, isLoading, error } = useUser();
  const { data: likeCount, isLoading: isLikeLoading, error: LikeError }  = useLikeCount({ parentType, ownerId: "", parentId });
  const createLike = useCreateLike({ ownerId: user?.id ?? "" });

  if(isLoading) return <div>is loading..</div>;
  if(isLikeLoading) return <div>like loadig..</div>;
  if(!canCreateLike(user)) return (
    <div className="inline-flex gap-2">
      <div className="border">
        like
      </div>
      <div className="text-white">{ likeCount?.like_count }</div>
      <div className="border">
        dislike
      </div>
    </div>
  );
  return (
    <div className="inline-flex gap-2">
      <div className="border" onClick={() => createLike.mutate({
        data: {
          parent_id: parentId,
          parent_type: parentType,
          is_positive: true,
        }
      })}>
        like
      </div>
      <div className="text-white">{ likeCount?.like_count }</div>
      <div className="border" onClick={() =>createLike.mutate({
        data: {
          parent_id: parentId,
          parent_type: parentType,
          is_positive: false,
        }
      })}>
        dislike
      </div>
    </div>
  );
}