import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Meta, Post } from "@/types/api";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { spacesToDashes } from "@/utils/format";

/* === Public === */

export const getPosts = ({ authorId = "", threadId = "", title = "", page = 1 } : { authorId : string, threadId : string, title : string, page ?: number }) : Promise<{ data: Post[]; meta: Meta }> => {
  return api.get('/posts', {
    params: {
      page: page,
      author_id: authorId,
      thread_id: threadId,
      title: spacesToDashes(title),
    }
  })
}

const postsQueryKey = ({ authorId, threadId, title } : { authorId ?: string, threadId ?: string, title ?: string }) => {
  const key: unknown[] = ['posts'];

  if(authorId) key.push('author', authorId);
  if(threadId) key.push('thread', threadId);
  if(title) key.push('title', spacesToDashes(title));

  return key;
}

export const getInfinitePostsQueryOptions = (authorId ?: string, threadId ?: string, title ?: string) => {
  return infiniteQueryOptions({
    queryKey: postsQueryKey({ authorId, threadId, title }), 
    queryFn: ({ pageParam = 1 }) => {
      return getPosts({ authorId: authorId ?? "", threadId: threadId ?? "", title: title ?? "", page: pageParam as number });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.page === lastPage?.meta?.totalPages) return undefined;
      const nextPage = lastPage.meta.page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  })
}

type UsePostsOptions = {
  authorId?: string;
  threadId?: string;
  title?: string;
  page?: number;
  queryConfig?: QueryConfig<typeof getPosts>;
};

export const useInfinitePosts = ({ authorId, threadId, title }: UsePostsOptions) => {
  return useInfiniteQuery({
    ...getInfinitePostsQueryOptions(authorId, threadId, title),
  });
};
