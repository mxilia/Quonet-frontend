import { api } from "@/lib/api-client"
import { QueryConfig } from "@/lib/react-query"
import { Meta, Thread } from "@/types/api"
import { spacesToDashes } from "@/utils/format"
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query"

export const getThreads = ({
  title,
  page = 1,
}: {
  title: string
  page?: number
}): Promise<{ data: Thread[]; meta: Meta }> => {
  return api.get("/threads", {
    params: {
      title: spacesToDashes(title),
      page: page,
    },
  })
}

const threadsQueryKey = ({ title }: { title?: string }) => {
  const key: unknown[] = ["threads"]

  if (title) key.push("title", spacesToDashes(title))

  return key
}

export const getInfiniteThreadsQueryOptions = (title?: string) => {
  return infiniteQueryOptions({
    queryKey: threadsQueryKey({ title }),
    queryFn: ({ pageParam = 1 }) => {
      return getThreads({ title: title ?? "", page: pageParam as number })
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.page === lastPage?.meta?.totalPages) return undefined
      const nextPage = lastPage.meta.page + 1
      return nextPage
    },
    initialPageParam: 1,
  })
}

type UseThreadsOptions = {
  title?: string
  page?: number
  queryConfig?: QueryConfig<typeof getThreads>
}

export const useInfiniteThreads = ({ title = "" }: UseThreadsOptions = {}) => {
  return useInfiniteQuery({
    ...getInfiniteThreadsQueryOptions(title),
  })
}
