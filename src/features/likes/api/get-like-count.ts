import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { LikeCount } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getLikeCount = ({ parentType = "", ownerId = "", parentId = "", page = 1 } : { parentType : string, ownerId : string, parentId : string, page ?: number }) : Promise<{ data: LikeCount }> => {
  return api.get('/likes/count', {
    params: {
      page: page,
      parent_type: parentType,
      owner_id: ownerId,
      parent_id: parentId,
    }
  })
}

export const getLikeCountQueryOptions = (parentType : string, ownerId : string, parentId : string) => {
  return queryOptions({
    queryKey: ['likeCount', parentType, ownerId, parentId],
    queryFn: ({ pageParam = 1 }) => {
      return getLikeCount({ parentType, ownerId, parentId, page: pageParam as number });
    },
  })
}

type UseLikeCountOptions = {
  parentType: string;
  ownerId: string;
  parentId: string;
  page?: number;
  queryConfig?: QueryConfig<typeof getLikeCount>;
};

export const useLikeCount = ({ parentType = "", ownerId = "", parentId = "", queryConfig }: UseLikeCountOptions) => {
  return useQuery({
      ...getLikeCountQueryOptions(parentType, ownerId, parentId),
      ...queryConfig,
    });
};
