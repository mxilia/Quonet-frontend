import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { Meta, Like } from "@/types/api";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

export const getLikes = ({ parentType = "", ownerId = "", parentId = "", page = 1 } : { parentType : string, ownerId : string, parentId : string, page ?: number }) : Promise<{ data: Like[]; meta: Meta }> => {
  return api.get('/likes', {
    params: {
      page: page,
      parent_type: parentType,
      owner_id: ownerId,
      parent_id: parentId,
    }
  })
}

const likesQueryKey = ({ parentType, ownerId, parentId } : { parentType ?: string, ownerId ?: string, parentId ?: string }) => {
  const key: unknown[] = ['likes'];

  if(parentType) key.push('type', parentType);
  if(ownerId) key.push('owner', ownerId);
  if(parentId) key.push('parent', parentId);

  return key;
}

export const getInfiniteLikesQueryOptions = (parentType ?: string, ownerId ?: string, parentId ?: string) => {
  return infiniteQueryOptions({
    queryKey: likesQueryKey({ parentType, ownerId, parentId }),
    queryFn: ({ pageParam = 1 }) => {
      return getLikes({ parentType: parentType ?? "", ownerId: ownerId ?? "", parentId: parentId ?? "", page: pageParam as number });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.page === lastPage?.meta?.totalPages) return undefined;
      const nextPage = lastPage.meta.page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  })
}

type UseLikesOptions = {
  parentType?: string;
  ownerId?: string;
  parentId?: string;
  page?: number;
  queryConfig?: QueryConfig<typeof getLikes>;
};

export const useInfiniteLikes = ({ parentType, ownerId, parentId }: UseLikesOptions) => {
  return useInfiniteQuery({
    ...getInfiniteLikesQueryOptions(parentType, ownerId, parentId),
  });
};
