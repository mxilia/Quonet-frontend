import { api } from "@/lib/api-client"
import { QueryConfig } from "@/lib/react-query"
import { LikeCount } from "@/types/api"
import { queryOptions, useQuery } from "@tanstack/react-query"

export const getLikeCount = ({
  parentType = "",
  ownerId = "",
  parentId = "",
}: {
  parentType: string
  ownerId: string
  parentId: string
}): Promise<LikeCount> => {
  return api.get("/likes/attributes/count", {
    params: {
      parent_type: parentType,
      owner_id: ownerId,
      parent_id: parentId,
    },
  })
}

const likeCountQueryKey = ({
  parentType,
  ownerId,
  parentId,
}: {
  parentType?: string
  ownerId?: string
  parentId?: string
}) => {
  const key: unknown[] = ["likes", "count"]

  if (parentType) key.push("type", parentType)
  if (parentId) key.push("parent", parentId)
  if (ownerId) key.push("owner", ownerId)

  return key
}

export const getLikeCountQueryOptions = (
  parentType?: string,
  ownerId?: string,
  parentId?: string,
) => {
  return queryOptions({
    queryKey: likeCountQueryKey({ parentType, ownerId, parentId }),
    queryFn: () => {
      return getLikeCount({
        parentType: parentType ?? "",
        ownerId: ownerId ?? "",
        parentId: parentId ?? "",
      })
    },
  })
}

type UseLikeCountOptions = {
  parentType?: string
  ownerId?: string
  parentId?: string
  queryConfig?: QueryConfig<typeof getLikeCount>
}

export const useLikeCount = ({
  parentType,
  ownerId,
  parentId,
  queryConfig,
}: UseLikeCountOptions) => {
  return useQuery({
    ...getLikeCountQueryOptions(parentType, ownerId, parentId),
    ...queryConfig,
  })
}
