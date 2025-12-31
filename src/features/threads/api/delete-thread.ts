import { api } from "@/lib/api-client"
import { MutationConfig } from "@/lib/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getInfiniteThreadsQueryOptions } from "./get-threads"
import { getThreadQueryOptions } from "./get-thread"

export const deleteThread = ({ threadId }: { threadId: string }) => {
  return api.delete(`/threads/${threadId}`)
}

type UseDeleteThreadOptions = {
  mutationConfig?: MutationConfig<typeof deleteThread>
}

export const useDeleteThread = ({ mutationConfig }: UseDeleteThreadOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, variables, _onMutateResult, _context) => {
      const { threadId } = variables

      queryClient.invalidateQueries({
        queryKey: getInfiniteThreadsQueryOptions().queryKey,
      })

      queryClient.invalidateQueries({
        queryKey: getThreadQueryOptions(threadId).queryKey,
      })

      onSuccess?.(data, variables, _onMutateResult, _context)
    },
    ...restConfig,
    mutationFn: deleteThread,
  })
}
