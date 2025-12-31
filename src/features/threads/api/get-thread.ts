import { api } from "@/lib/api-client"
import { QueryConfig } from "@/lib/react-query"
import { Thread } from "@/types/api"
import { queryOptions, useQuery } from "@tanstack/react-query"

export const getThread = ({ threadId }: { threadId: string }): Promise<Thread> => {
  return api.get(`/threads/${threadId}`)
}

export const getThreadQueryOptions = (threadId: string) => {
  return queryOptions({
    queryKey: ["thread", threadId],
    queryFn: () => getThread({ threadId }),
  })
}

type useThreadOptions = {
  threadId: string
  queryConfig?: QueryConfig<typeof getThreadQueryOptions>
}

export const useThread = ({ threadId, queryConfig }: useThreadOptions) => {
  return useQuery({
    ...getThreadQueryOptions(threadId),
    ...queryConfig,
  })
}
