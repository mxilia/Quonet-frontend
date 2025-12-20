import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { LikeState } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getLikeState = ({ parentType = "", parentId = "" } : { parentType : string, parentId : string }) : Promise<LikeState> => {
  return api.get('/likes/attributes/state', {
    params: {
      parent_type: parentType,
      parent_id: parentId,
    }
  });
}

const likeStateQueryKey = ({ parentType, parentId } : { parentType ?: string, parentId ?: string }) => {
  const key: unknown[] = ['likes', 'state'];

  if(parentType) key.push('type', parentType);
  if(parentId) key.push('parent', parentId);

  return key;
}

export const getLikeStateQueryOptions = (parentType ?: string, parentId ?: string) => {
  return queryOptions({
    queryKey: likeStateQueryKey({ parentType, parentId }),
    queryFn: () => {
      return getLikeState({ parentType: parentType ?? "", parentId: parentId ?? "" });
    },
  })
}

type UseLikeStateOptions = {
  parentType?: string;
  parentId?: string;
  queryConfig?: QueryConfig<typeof getLikeState>;
};

export const useLikeState = ({ parentType, parentId, queryConfig }: UseLikeStateOptions) => {
  return useQuery({
      ...getLikeStateQueryOptions(parentType, parentId),
      ...queryConfig,
    });
};
