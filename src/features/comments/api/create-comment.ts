import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Comment } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { getInfiniteCommentsQueryOptions } from "./get-comments";

export const createCommentInputSchema = z.object({
  content: z.string().min(1, "Required"),
  parent_id: z.string().optional(),
  root_id: z.string().min(1, "Required"),
});

export type CreateCommentInput = z.infer<typeof createCommentInputSchema>;

export const createComment = ({ data } : { authorId : string, data : CreateCommentInput }) : Promise<Comment> => {
  return api.post('/comments', data)
}

type useCreateCommentOptions = {
  authorId: string;
  mutationConfig?: MutationConfig<typeof createComment>;
};

export const useCreateComment = ({ authorId, mutationConfig } : useCreateCommentOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, _onMutateResult, _context) => {
      const { parent_id: parentId, root_id: rootId } = variables.data;

      const keysToInvalidate = [
        [authorId, parentId, rootId],
        [authorId, parentId, ""],
        [authorId, "", rootId],
        ["", parentId, rootId],
        ["", "", rootId],
        [authorId, "", ""],
        ["", parentId, ""],
        ["", "", ""],       
      ];

      keysToInvalidate.forEach(([author, parent, root]) => {
        queryClient.invalidateQueries({
          queryKey: getInfiniteCommentsQueryOptions(author!, parent!, root!).queryKey
        })
      });
      
      onSuccess?.(data, variables, _onMutateResult, _context);
    },
    ...restConfig,
    mutationFn: ({ authorId, data }) => createComment({ authorId, data }),
  });
}