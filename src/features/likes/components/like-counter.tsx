import { LikeCount } from "@/types/api"
import { UseQueryResult } from "@tanstack/react-query"

type LikeCounterProps = {
  likeCount: UseQueryResult<LikeCount, Error>
  className?: string
}

export const LikeCounter = ({ likeCount, className }: LikeCounterProps) => {
  if (likeCount?.isLoading) return <div>loading</div>
  return <div className={className}>{likeCount.data?.like_count}</div>
}
