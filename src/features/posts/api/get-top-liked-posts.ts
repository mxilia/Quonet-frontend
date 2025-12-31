import { api } from "@/lib/api-client"
import { QueryConfig } from "@/lib/react-query"
import { Post } from "@/types/api"
import { spacesToDashes } from "@/utils/format"
import { queryOptions, useQuery } from "@tanstack/react-query"

/* === Public === */

export const getTopLikedPosts = ({
  authorId = "",
  threadId = "",
  title = "",
  limit = 3,
}: {
  authorId: string
  threadId: string
  title: string
  limit?: number
}): Promise<Post[]> => {
  return api.get("/posts/top/like", {
    params: {
      limit: limit,
      author_id: authorId,
      thread_id: threadId,
      title: spacesToDashes(title),
    },
  })
}

const topLikedPostsQueryKey = ({
  authorId,
  threadId,
  title,
  limit,
}: {
  authorId?: string
  threadId?: string
  title?: string
  limit?: number
}) => {
  const key: unknown[] = ["posts", "top-liked"]

  if (authorId) key.push("author", authorId)
  if (threadId) key.push("thread", threadId)
  if (title) key.push("title", spacesToDashes(title))
  if (limit) key.push("limit", limit)

  return key
}

export const getTopLikedPostsQueryOptions = (
  authorId?: string,
  threadId?: string,
  title?: string,
  limit?: number,
) => {
  return queryOptions({
    queryKey: topLikedPostsQueryKey({ authorId, threadId, title, limit }),
    queryFn: () =>
      getTopLikedPosts({
        authorId: authorId ?? "",
        threadId: threadId ?? "",
        title: title ?? "",
        limit: limit ?? 3,
      }),
  })
}

type useTopLikedPostsOptions = {
  authorId?: string
  threadId?: string
  title?: string
  limit?: number
  queryConfig?: QueryConfig<typeof getTopLikedPostsQueryOptions>
}

export const useTopLikedPosts = ({
  authorId,
  threadId,
  title,
  limit = 3,
  queryConfig,
}: useTopLikedPostsOptions) => {
  return useQuery({
    ...getTopLikedPostsQueryOptions(authorId, threadId, title, limit),
    ...queryConfig,
  })
}
