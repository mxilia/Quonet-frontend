import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getInfiniteLikesQueryOptions } from "./get-likes";
import { getLikeCountQueryOptions } from "./get-like-count";
import { getLikeQueryOptions } from "./get-like";
import { getLikeStateQueryOptions } from "./get-like-state";

export const deleteLike = ({ likeId } : { likeId : string }) : Promise<void> => {
  return api.delete(`/likes/${likeId}`)
}

type DeleteLikeVariables = {
  likeId: string;
  parentId: string;
  parentType?: string;
};

type useDeleteLikeOptions = {
  mutationConfig?: MutationConfig<typeof deleteLike>;
};

export const useDeleteLike = ({ mutationConfig } : useDeleteLikeOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation<void, Error, DeleteLikeVariables>({
    onSuccess: (data, variables, _onMutateResult, _context) => {
      const { likeId, parentType, parentId } = variables

      queryClient.invalidateQueries({
        queryKey: getInfiniteLikesQueryOptions(parentType).queryKey
      });

      queryClient.invalidateQueries({
        queryKey: getLikeCountQueryOptions(parentType, undefined, parentId).queryKey
      });

      queryClient.invalidateQueries({
        queryKey: getLikeStateQueryOptions(parentType, parentId).queryKey
      });

      queryClient.invalidateQueries({
        queryKey: getLikeQueryOptions(likeId).queryKey
      });

      onSuccess?.(data, variables, _onMutateResult, _context);
    },
    ...restConfig,
    mutationFn: ({ likeId }) => deleteLike({ likeId }),
  });
}
