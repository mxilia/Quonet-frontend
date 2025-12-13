import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { getInfiniteCommentsQueryOptions } from "./get-comments";
import { getCommentQueryOptions } from "./get-comment";

export const updateCommentInputSchema = z.object({
  content: z.string().min(1, "Required"),
});

export type UpdateCommentInput = z.infer<typeof updateCommentInputSchema>;

export const updateComment = ({ commentId, data } : { commentId : string, data : UpdateCommentInput }) : Promise<void> => {
  return api.patch(`/comments/${commentId}`, data)
}

type UpdateCommentVariables = {
  authorId: string;
  parentId: string;
  rootId: string;
  commentId: string;
  data: UpdateCommentInput;
}

type UseUpdateCommentOptions = {
  mutationConfig?: MutationConfig<typeof updateComment>;
};

export const useUpdateComment = ({ mutationConfig } : UseUpdateCommentOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation<void, Error, UpdateCommentVariables>({
    onSuccess: (data, variables, _onMutateResult, _context) => {
      const { authorId = "", parentId = "", rootId = "", commentId } = variables;

      queryClient.invalidateQueries({
        queryKey: getCommentQueryOptions(commentId).queryKey
      });

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
    mutationFn: ({ commentId, data }) => updateComment({ commentId, data }),
  });
};


