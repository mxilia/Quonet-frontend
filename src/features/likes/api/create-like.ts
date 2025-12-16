'use client';

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Like } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { getInfiniteLikesQueryOptions } from "./get-likes";
import { getLikeCountQueryOptions } from "./get-like-count";

export const createLikeInputSchema = z.object({
  parent_id: z.string().min(1, 'Required'),
  parent_type: z.enum(["post", "comment"]),
  is_positive: z.boolean('Required'),
});

export type CreateLikeInput = z.infer<typeof createLikeInputSchema>;

export const createLike = ({ data } : { data : CreateLikeInput }) : Promise<Like> => {
  return api.post('/likes', data)
}

type useCreateLikeOptions = {
  ownerId: string;
  mutationConfig?: MutationConfig<typeof createLike>;
};

export const useCreateLike = ({ ownerId, mutationConfig } : useCreateLikeOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, _onMutateResult, _context) => {
      const { parent_type: parentType, parent_id: parentId } = variables.data

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
      })

      onSuccess?.(data, variables, _onMutateResult, _context);
    },
    ...restConfig,
    mutationFn: createLike,
  });
}
