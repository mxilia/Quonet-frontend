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
  authorId: string;
  mutationConfig?: MutationConfig<typeof createPost>;
};

export const useCreatePost = ({ authorId, mutationConfig } : useCreatePostOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, _onMutateResult, _context) => {
      const { thread_id: threadId = "" } = variables.data;

      if(authorId != "" && threadId !=""){
        queryClient.invalidateQueries({
          queryKey: getInfinitePostsQueryOptions(authorId, threadId, "").queryKey,
        });
      }

      if(authorId != ""){
        queryClient.invalidateQueries({
          queryKey: getInfinitePostsQueryOptions(authorId, "", "").queryKey,
        });
      }

      if(threadId !=""){
        queryClient.invalidateQueries({
          queryKey: getInfinitePostsQueryOptions("", threadId, "").queryKey,
        });
      }

      queryClient.invalidateQueries({
        queryKey: getInfinitePostsQueryOptions("", "", "").queryKey,
      });

      onSuccess?.(data, variables, _onMutateResult, _context);
    },
    ...restConfig,
    mutationFn: createPost,
  });
}