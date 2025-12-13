import { api } from "@/lib/api-client";
import { Meta, User } from "@/types/api";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

export const getUsers = ({ page = 1 } : { page ?: number }) : Promise<{ data: User[]; meta: Meta }> => {
  return api.get('/users', {
    params: {
      page: page
    }
  })
}

export const getInfiniteUsersQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) => {
      return getUsers({ page: pageParam as number});
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.page === lastPage?.meta?.totalPages) return undefined;
      const nextPage = lastPage.meta.page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  })
}

export const useInfiniteUsers = () => {
  return useInfiniteQuery({
    ...getInfiniteUsersQueryOptions(),
  })
}