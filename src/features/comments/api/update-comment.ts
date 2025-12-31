import { api } from "@/lib/api-client"
import { MutationConfig } from "@/lib/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import z from "zod"
import { getInfiniteCommentsQueryOptions } from "./get-comments"
import { getCommentQueryOptions } from "./get-comment"

export const updateCommentInputSchema = z.object({
  content: z.string().min(1, "Required"),
})

export type UpdateCommentInput = z.infer<typeof updateCommentInputSchema>

export const updateComment = ({
  commentId,
  data,
}: {
  commentId: string
  data: UpdateCommentInput
}): Promise<void> => {
  return api.patch(`/comments/${commentId}`, data)
}

type UpdateCommentVariables = {
  commentId: string
  data: UpdateCommentInput
}

type UseUpdateCommentOptions = {
  mutationConfig?: MutationConfig<typeof updateComment>
}

export const useUpdateComment = ({ mutationConfig }: UseUpdateCommentOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation<void, Error, UpdateCommentVariables>({
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
    mutationFn: ({ commentId, data }) => updateComment({ commentId, data }),
  })
}
