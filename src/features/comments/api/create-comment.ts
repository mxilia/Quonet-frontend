import { api } from "@/lib/api-client"
import { MutationConfig } from "@/lib/react-query"
import { Comment } from "@/types/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import z from "zod"
import { getInfiniteCommentsQueryOptions } from "./get-comments"

export const createCommentInputSchema = z.object({
  content: z.string().min(1, "Required").max(2000, "content cannot be longer than 2000 characters"),
})

export type CreateCommentInput = z.infer<typeof createCommentInputSchema>

export const createComment = ({
  authorId,
  parentId,
  rootId,
  data,
}: {
  authorId: string
  parentId: string
  rootId: string
  data: CreateCommentInput
}): Promise<Comment> => {
  return api.post("/comments", {
    ...data,
    author_id: authorId,
    parent_id: parentId,
    root_id: rootId,
  })
}

type CreateCommentVariables = {
  authorId: string
  parentId: string
  rootId: string
  data: CreateCommentInput
}

type useCreateCommentOptions = {
  mutationConfig?: MutationConfig<typeof createComment>
}

export const useCreateComment = ({ mutationConfig }: useCreateCommentOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation<Comment, Error, CreateCommentVariables>({
    onSuccess: (data, variables, _onMutateResult, _context) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteCommentsQueryOptions().queryKey,
      })

      onSuccess?.(data, variables, _onMutateResult, _context)
    },
    ...restConfig,
    mutationFn: ({ authorId, parentId, rootId, data }) =>
      createComment({ authorId, parentId, rootId, data }),
  })
}
