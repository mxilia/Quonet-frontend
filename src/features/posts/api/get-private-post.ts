import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Post } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

/* === Private === */

export const getPrivatePost = ({ postId } : { postId : string }) : Promise<{ data: Post }> => {
  return api.get(`/posts/private/${postId}`)
}

export const getPrivatePostQueryOptions = (postId : string) => {
  return queryOptions({
    queryKey: ['post', 'private', postId],
    queryFn: () => getPrivatePost({postId}),
  })
}

type usePrivatePostOptions = {
  postId: string;
  queryConfig?: QueryConfig<typeof getPrivatePostQueryOptions>;
}

export const usePrivatePost = ({ postId, queryConfig } : usePrivatePostOptions) => {
  return useQuery({
    ...getPrivatePostQueryOptions(postId),
    ...queryConfig,
  });
}
