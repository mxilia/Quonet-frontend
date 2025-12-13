import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { Thread } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { getInfiniteThreadsQueryOptions } from "./get-threads";

export const createThreadInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  description: z.string().min(1, "Required"),
  image_url: z.string().optional(),
});

export type CreateThreadInput = z.infer<typeof createThreadInputSchema>;

export const createThread = ({ data } : { data : CreateThreadInput }) : Promise<Thread> => {
  return api.post('/threads', data)
}

type useCreateThreadOptions = {
  mutationConfig?: MutationConfig<typeof createThread>;
};

export const useCreateThread = ({ mutationConfig } : useCreateThreadOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteThreadsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createThread,
  });
}
