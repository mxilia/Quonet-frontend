import { api } from "@/lib/api-client";
import { Post } from "@/types/api";
import { MutationConfig } from '@/lib/react-query';
import z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getInfinitePostsQueryOptions } from "./get-posts";

const MAX_SIZE = 1*1024*1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const createPostInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  thread_id: z.string().min(1, 'Required'),
  content: z.string().min(1, 'Required'),
  thumbnail: z.any()
  .transform((files) => {
    if (files instanceof FileList) return files[0];
    return files;
  })
  .refine((file) => !file || file instanceof File, "Invalid file")
  .optional()
  .refine((file) => !file || file.size <= MAX_SIZE, "Max file size is 1MB")
  .refine((file) => !file || ACCEPTED_TYPES.includes(file.type), "Only JPG, PNG, WEBP allowed"),
});

export type CreatePostInput = z.infer<typeof createPostInputSchema>;

export const createPost = ({ data } : { data : CreatePostInput }) : Promise<Post> => {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('thread_id', data.thread_id);
  formData.append('content', data.content);

  if(data.thumbnail) {
    formData.append('thumbnail', data.thumbnail);
  }

  return api.post('/posts', formData)
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