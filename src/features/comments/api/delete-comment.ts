import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getInfiniteCommentsQueryOptions } from "./get-comments";
import { getCommentQueryOptions } from "./get-comment";

export const deleteComment = ({ commentId } : { commentId : string }) : Promise<void> => {
  return api.delete(`/comments/${commentId}`)
}

type DeleteCommentVariables = {
  authorId: string;
  parentId: string;
  rootId: string;
  commentId: string;
};

type useDeleteCommentOptions = {
  mutationConfig?: MutationConfig<typeof deleteComment>;
};

export const useDeleteComment = ({ mutationConfig } : useDeleteCommentOptions ) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation<void, Error, DeleteCommentVariables>({
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
    mutationFn: ({ commentId }) => deleteComment({ commentId }),
  });
}