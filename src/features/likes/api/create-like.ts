'use client';

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Like, LikeCount, LikeState } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { getInfiniteLikesQueryOptions } from "./get-likes";
import { getLikeCountQueryOptions } from "./get-like-count";
import { getLikeStateQueryOptions } from "./get-like-state";

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
  mutationConfig?: MutationConfig<typeof createLike>;
};

export const useCreateLike = ({ mutationConfig } : useCreateLikeOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, _onMutateResult, _context) => {
      const { parent_type: parentType, parent_id: parentId } = variables.data
      
      queryClient.invalidateQueries({
        queryKey: getInfiniteLikesQueryOptions(parentType).queryKey
      });

      queryClient.invalidateQueries({
        queryKey: getLikeCountQueryOptions(parentType, undefined, parentId).queryKey
      });

      queryClient.invalidateQueries({
        queryKey: getLikeStateQueryOptions(parentType, parentId).queryKey
      });

      onSuccess?.(data, variables, _onMutateResult, _context);
    },
    onMutate: async (vars) => {
      const { is_positive: isPositive, parent_type: parentType, parent_id: parentId } = vars.data;

      const likeStateQueryKey = getLikeStateQueryOptions(parentType, parentId).queryKey;
      const likeCountQueryKey = getLikeCountQueryOptions(parentType, undefined, parentId).queryKey;

      await queryClient.cancelQueries({ queryKey: likeStateQueryKey });
      await queryClient.cancelQueries({ queryKey: likeCountQueryKey });

      const previousLikeState = queryClient.getQueryData<LikeState>(likeStateQueryKey);
      const previousLikeCount = queryClient.getQueryData<LikeCount>(likeCountQueryKey);

      let likeCountChange = 0;

      queryClient.setQueryData<LikeState>(likeStateQueryKey, old => {
        if(!old) return old;

        let oldIsLiked = old.is_liked;
        let oldIsPositive = old.is_like_positive;

        if(!oldIsLiked) {
          if(isPositive) likeCountChange = 1;
          else likeCountChange = -1;
          return {
            is_liked: true,
            is_like_positive: isPositive,
          };
        }
        
        if(oldIsPositive == isPositive){
          if(isPositive) likeCountChange = -1;
          else likeCountChange = 1;
          return {
            is_liked: false,
            is_like_positive: false,
          };
        }
        else {
          if(isPositive) likeCountChange = 2;
          else likeCountChange = -2;
          return {
            is_liked: true,
            is_like_positive: isPositive,
          };
        }
      });

      queryClient.setQueryData<LikeCount>(likeCountQueryKey, old => {
        if(!old) return old;

        return {
          like_count: old.like_count+likeCountChange
        };
      });

      return { 
        likeStateQueryKey, 
        likeCountQueryKey,
        previousLikeState,
        previousLikeCount,
      }
    },
    onError: (_err, _vars, ctx : any) => {
      if(!ctx) return;
      if(ctx.previousLikeState) queryClient.setQueryData(ctx.likeStateQueryKey, ctx.previousLikeState);
      if(ctx.previousLikeCount) queryClient.setQueryData(ctx.likeCountQueryKey, ctx.previousLikeCount);
    },
    mutationFn: createLike,
  });
}
