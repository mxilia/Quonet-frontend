import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Meta, Comment } from "@/types/api";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

export const getComments = ({ authorId = "", parentId = "", rootId = "", page = 1 } : { authorId : string, parentId : string, rootId : string, page ?: number }) : Promise<{ data: Comment[]; meta: Meta }> => {
  return api.get('/comments', {
    params: {
      page: page,
      author_id: authorId,
      parent_id: parentId,
      root_id: rootId,
    }
  })
}

const commentsQueryKey = ({ authorId, parentId, rootId } : { authorId ?: string, parentId ?: string, rootId ?: string }) => {
  const key: unknown[] = ['comments'];

  if(authorId) key.push('author', authorId);
  if(parentId) key.push('parent', parentId);
  if(rootId) key.push('root', rootId);

  return key;
}


export const getInfiniteCommentsQueryOptions = (authorId ?: string, parentId ?: string, rootId ?: string) => {
  return infiniteQueryOptions({
    queryKey: commentsQueryKey({ authorId, parentId, rootId }),
    queryFn: ({ pageParam = 1 }) => {
      return getComments({ authorId: authorId ?? "", parentId: parentId ?? "", rootId: rootId ?? "", page: pageParam as number });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.page === lastPage?.meta?.totalPages) return undefined;
      const nextPage = lastPage.meta.page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  })
}

type UseCommentsOptions = {
  authorId?: string;
  parentId?: string;
  rootId?: string;
  page?: number;
  queryConfig?: QueryConfig<typeof getComments>;
};

export const useInfiniteComments = ({ authorId, parentId, rootId }: UseCommentsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteCommentsQueryOptions(authorId, parentId, rootId),
  });
};
