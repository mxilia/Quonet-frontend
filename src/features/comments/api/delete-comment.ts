import { api } from "@/lib/api-client"
import { MutationConfig } from "@/lib/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getInfiniteCommentsQueryOptions } from "./get-comments"
import { getCommentQueryOptions } from "./get-comment"

export const deleteComment = ({ commentId }: { commentId: string }): Promise<void> => {
  return api.delete(`/comments/${commentId}`)
}

type DeleteCommentVariables = {
  commentId: string
}

type useDeleteCommentOptions = {
  mutationConfig?: MutationConfig<typeof deleteComment>
}

export const useDeleteComment = ({ mutationConfig }: useDeleteCommentOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation<void, Error, DeleteCommentVariables>({
    onSuccess: (data, variables, _onMutateResult, _context) => {
      const { commentId } = variables

      queryClient.invalidateQueries({
        queryKey: getInfiniteCommentsQueryOptions().queryKey,
      })

      queryClient.invalidateQueries({
        queryKey: getCommentQueryOptions(commentId).queryKey,
      })

      onSuccess?.(data, variables, _onMutateResult, _context)
    },
    ...restConfig,
    mutationFn: ({ commentId }) => deleteComment({ commentId }),
  })
}
