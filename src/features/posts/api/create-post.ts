import { api } from "@/lib/api-client";
import { Post } from "@/types/api";
import { MutationConfig } from '@/lib/react-query';
import z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getInfinitePostsQueryOptions } from "./get-posts";

export const createPostInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  thread_id: z.string().min(1, 'Required'),
  content: z.string().min(1, 'Required'),
  thumbnail_url: z.string().optional(),
});

export type CreatePostInput = z.infer<typeof createPostInputSchema>;

export const createPost = ({ data } : { data : CreatePostInput }) : Promise<Post> => {
  return api.post('/posts', data)
}

type useCreatePostOptions = {
  mutationConfig?: MutationConfig<typeof createPost>;
};

export const useCreatePost = ({ mutationConfig } : useCreatePostOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfinitePostsQueryOptions().queryKey,
      });

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createPost,
  });
}