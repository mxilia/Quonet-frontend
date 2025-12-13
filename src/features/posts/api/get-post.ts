import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Post } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

/* === Public === */

export const getPost = ({ postId } : { postId : string }) : Promise<{ data: Post }> => {
  return api.get(`/posts/${postId}`)
}

export const getPostQueryOptions = (postId : string) => {
  return queryOptions({
    queryKey: ['posts', postId],
    queryFn: () => getPost({postId}),
  })
}

type usePostOptions = {
  postId: string;
  queryConfig?: QueryConfig<typeof getPostQueryOptions>;
}

export const usePost = ({ postId, queryConfig } : usePostOptions) => {
  return useQuery({
    ...getPostQueryOptions(postId),
    ...queryConfig,
  });
}
