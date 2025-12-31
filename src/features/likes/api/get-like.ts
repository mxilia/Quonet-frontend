import { api } from "@/lib/api-client"
import { QueryConfig } from "@/lib/react-query"
import { Like } from "@/types/api"
import { queryOptions, useQuery } from "@tanstack/react-query"

export const getLike = ({ likeId }: { likeId: string }): Promise<{ data: Like }> => {
  return api.get(`/likes/${likeId}`)
}

export const getLikeQueryOptions = (likeId: string) => {
  return queryOptions({
    queryKey: ["likes", likeId],
    queryFn: () => getLike({ likeId }),
  })
}

type useLikeOptions = {
  likeId: string
  queryConfig?: QueryConfig<typeof getLikeQueryOptions>
}

export const useLike = ({ likeId, queryConfig }: useLikeOptions) => {
  return useQuery({
    ...getLikeQueryOptions(likeId),
    ...queryConfig,
  })
}
