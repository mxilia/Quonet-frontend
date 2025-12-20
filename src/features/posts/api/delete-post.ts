import { api } from "@/lib/api-client";
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getInfinitePostsQueryOptions } from "./get-posts";
import { getPostQueryOptions } from "./get-post";


export const deletePost = ({ postId } : { postId : string }) : Promise<void> => {
  return api.delete(`/posts/${postId}`)
}

type DeletePostVariables = {
  postId: string;
};

type useDeletePostOptions = {
  mutationConfig?: MutationConfig<typeof deletePost>;
};

export const useDeletePost = ({ mutationConfig } : useDeletePostOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation<void, Error, DeletePostVariables>({
    onSuccess: (data, variables, _onMutateResult, _context) => {
      const { postId } = variables;

      queryClient.invalidateQueries({
        queryKey: getInfinitePostsQueryOptions().queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getPostQueryOptions(postId).queryKey,
      });
      
      onSuccess?.(data, variables, _onMutateResult, _context);
    },
    ...restConfig,
    mutationFn: ({ postId }) => deletePost({ postId }),
  });
}