import { api } from "@/lib/api-client";
import { Meta, Thread } from "@/types/api";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

export const getThreads = ({ page = 1 } : { page ?: number }) : Promise<{ data: Thread[]; meta: Meta }> => {
  return api.get('/threads', {
    params: {
      page: page,
    }
  })
}

export const getInfiniteThreadsQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ['threads'],
    queryFn: ({ pageParam = 1 }) => {
      return getThreads({ page: pageParam as number });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.page === lastPage?.meta?.totalPages) return undefined;
      const nextPage = lastPage.meta.page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  })
}

export const useInfiniteThreads = () => {
  return useInfiniteQuery({
    ...getInfiniteThreadsQueryOptions(),
  });
};
