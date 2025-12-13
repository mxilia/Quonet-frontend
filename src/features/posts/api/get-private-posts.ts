import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Meta, Post } from "@/types/api";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { spacesToDashes } from "@/utils/format";

/* === Private === */

export const getPrivatePosts = ({ authorId = "", threadId = "", title = "", page = 1 } : { authorId : string, threadId : string, title : string, page ?: number }) : Promise<{ data: Post[]; meta: Meta }> => {
  return api.get('/posts/private', {
    params: {
      page: page,
      author_id: authorId,
      thread_id: threadId,
      title: spacesToDashes(title),
    }
  })
}

export const getInfinitePrivatePostsQueryOptions = (authorId : string, threadId : string, title : string) => {
  return infiniteQueryOptions({
    queryKey: ['posts', 'private', authorId, threadId, title],
    queryFn: ({ pageParam = 1 }) => {
      return getPrivatePosts({ authorId: authorId, threadId: threadId, title: title, page: pageParam as number });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.page === lastPage?.meta?.totalPages) return undefined;
      const nextPage = lastPage.meta.page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  })
}

type UsePrivatePostsOptions = {
  authorId: string;
  threadId: string;
  title: string;
  page?: number;
  queryConfig?: QueryConfig<typeof getPrivatePosts>;
};

export const useInfinitePrivatePosts = ({ authorId = "", threadId = "", title = "" }: UsePrivatePostsOptions) => {
  return useInfiniteQuery({
    ...getInfinitePrivatePostsQueryOptions(authorId, threadId, title),
  });
};
