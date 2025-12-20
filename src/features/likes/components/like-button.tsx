import { LikeModifyChildrenProps } from "./like-modify";
import { canCreateLike } from "@/lib/authorization";

type LikeButtonProps = Omit<LikeModifyChildrenProps, "likeCount"> & 
{
  value: boolean;
  className?: string;
  activatedClassName?: string;
};

export const LikeButton = ({ parentId, parentType, createLike, likeState, user, value, className, activatedClassName } : LikeButtonProps) => {
  return (
    <div className={`select-none ${className} ${ likeState.data && likeState.data.is_liked && likeState.data.is_like_positive === value ? activatedClassName : ""}`} onClick={() => {
      if(user.isLoading) return;
      if(!canCreateLike(user.data)) return;
      createLike.mutate({
        data: {
          parent_id: parentId,
          parent_type: parentType,
          is_positive: value,
        }
      });
    }}>
      {value ? "like" : "dislike"}
    </div>
  )
}