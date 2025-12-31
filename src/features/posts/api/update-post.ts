import { api } from "@/lib/api-client"
import { MutationConfig } from "@/lib/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import z from "zod"
import { getInfinitePostsQueryOptions } from "./get-posts"
import { getPostQueryOptions } from "./get-post"

export const updatePostInputSchema = z.object({
  thumbnail_url: z.string(),
  is_private: z.boolean(),
})

export type UpdatePostInput = z.infer<typeof updatePostInputSchema>

export const updatePost = ({
  postId,
  data,
}: {
  postId: string
  data: UpdatePostInput
}): Promise<void> => {
  return api.patch(`/posts/${postId}`, data)
}

type UpdatePostVariables = {
  postId: string
  data: UpdatePostInput
}

type UseUpdatePostOptions = {
  mutationConfig?: MutationConfig<typeof updatePost>
}

export const useUpdatePost = ({ mutationConfig }: UseUpdatePostOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation<void, Error, UpdatePostVariables>({
    onSuccess: (data, variables, _onMutateResult, _context) => {
      const { postId } = variables

      queryClient.invalidateQueries({
        queryKey: getInfinitePostsQueryOptions().queryKey,
      })

      queryClient.invalidateQueries({
        queryKey: getPostQueryOptions(postId).queryKey,
      })

      onSuccess?.(data, variables, _onMutateResult, _context)
    },
    ...restConfig,
    mutationFn: ({ postId, data }) => updatePost({ postId, data }),
  })
}
