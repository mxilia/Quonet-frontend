import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Post } from "@/types/api";
import { spacesToDashes } from "@/utils/format";
import { queryOptions, useQuery } from "@tanstack/react-query";

/* === Public === */

export const getTopLikedPosts = ({ authorId = "", threadId = "", title = "", limit = 3 } : { authorId : string, threadId : string, title : string, limit ?: number }) : Promise<Post[]> => {
  return api.get('/posts/top/like', {
    params: {
      limit: limit,
      author_id: authorId,
      thread_id: threadId,
      title: spacesToDashes(title),
    }
  });
}

export const getTopLikedPostsQueryOptions = (authorId : string, threadId : string, title : string, limit ?: number) => {
  return queryOptions({
    queryKey: ['posts', 'top-liked', 'author', authorId, 'thread', threadId, 'title', title, 'limit', limit],
    queryFn: () => getTopLikedPosts({authorId, threadId, title, limit}),
  })
}

type useTopLikedPostsOptions = {
  authorId: string;
  threadId: string; 
  title: string;
  limit?: number;
  queryConfig?: QueryConfig<typeof getTopLikedPostsQueryOptions>;
}

export const useTopLikedPosts = ({ authorId = "", threadId = "", title = "", limit = 3, queryConfig } : useTopLikedPostsOptions) => {
  return useQuery({
    ...getTopLikedPostsQueryOptions(authorId, threadId, title, limit),
    ...queryConfig,
  });
}
