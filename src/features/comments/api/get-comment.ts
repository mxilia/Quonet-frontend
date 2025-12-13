import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Comment } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getComment = ({ commentId } : { commentId : string }) : Promise<{ data: Comment }> => {
  return api.get(`/comments/${commentId}`)
}

export const getCommentQueryOptions = (commentId : string) => {
  return queryOptions({
    queryKey: ['comments', commentId],
    queryFn: () => getComment({commentId}),
  })
}

type useCommentOptions = {
  commentId: string;
  queryConfig?: QueryConfig<typeof getCommentQueryOptions>;
}

export const useComment = ({ commentId, queryConfig } : useCommentOptions) => {
  return useQuery({
    ...getCommentQueryOptions(commentId),
    ...queryConfig,
  });
}
