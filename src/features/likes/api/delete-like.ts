import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getInfiniteLikesQueryOptions } from "./get-likes";
import { getLikeCountQueryOptions } from "./get-like-count";

export const deleteLike = ({ likeId } : { likeId : string }) : Promise<void> => {
  return api.delete(`/likes/${likeId}`)
}

type DeleteLikeVariables = {
  likeId: string;
  parentType: string;
  ownerId: string;
  parentId: string;
};

type useDeleteLikeOptions = {
  mutationConfig?: MutationConfig<typeof deleteLike>;
};

export const useDeleteLike = ({ mutationConfig } : useDeleteLikeOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation<void, Error, DeleteLikeVariables>({
    onSuccess: (data, variables, _onMutateResult, _context) => {
      const { parentType, ownerId, parentId } = variables

      const keysToInvalidate = [
        [parentType, ownerId, parentId],
        [parentType, ownerId, ""],
        [parentType, "", parentId],
        ["", ownerId, parentId],
        ["", "", parentId],
        [parentType, "", ""],
        ["", ownerId, ""],
        ["", "", ""],       
      ];

      keysToInvalidate.forEach(([type, owner, parent]) => {
        queryClient.invalidateQueries({
          queryKey: getInfiniteLikesQueryOptions(type, owner, parent).queryKey
        })
        queryClient.invalidateQueries({
          queryKey: getLikeCountQueryOptions(type, owner, parent).queryKey
        })
      });

      onSuccess?.(data, variables, _onMutateResult, _context);
    },
    ...restConfig,
    mutationFn: ({ likeId }) => deleteLike({ likeId }),
  });
}
