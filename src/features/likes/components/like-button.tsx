import { LikeModifyChildrenProps } from "./like-modify"
import { canCreateLike } from "@/lib/authorization"

type LikeButtonProps = Omit<LikeModifyChildrenProps, "likeCount"> & {
  value: boolean
  className?: string
  activatedClassName?: string
}

export const LikeButton = ({
  parentId,
  parentType,
  createLike,
  likeState,
  user,
  value,
  className,
  activatedClassName,
}: LikeButtonProps) => {
  return (
    <div
      className="flex items-center justify-center rounded-sm p-1 hover:bg-(--secondary)/10"
      onClick={() => {
        if (user.isLoading) return
        if (!canCreateLike(user.data)) return
        createLike.mutate({
          data: {
            parent_id: parentId,
            parent_type: parentType,
            is_positive: value,
          },
        })
      }}
    >
      <div
        className={`select-none ${likeState.data !== undefined && likeState.data.is_liked === true && likeState.data.is_like_positive === value ? activatedClassName : className}`}
      ></div>
    </div>
  )
}
