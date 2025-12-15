import { useUser } from "@/lib/auth";
import { useCreateLike } from "../api/create-like";
import { useLikeCount } from "../api/get-like-count";

type LikeModifyProps = {
  parentId: string;
  parentType: "post" | "comment";
}

export const LikeModify = ({ parentId, parentType } : LikeModifyProps) => {
  const { data: user, isLoading, error } = useUser();
  
  if(isLoading) return <div>is loading/..</div>

  const createLike = useCreateLike({ ownerId: user!.id });

  const { data: likeCount, isLoading: isLikeLoading, error: LikeError }  = useLikeCount({ parentType, ownerId: "", parentId });

  if(isLikeLoading) return <div>like loadig..</div>

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