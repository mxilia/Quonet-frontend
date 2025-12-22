import { api } from "@/lib/api-client";
import { Announcement } from "@/types/api";
import { MutationConfig } from '@/lib/react-query';
import z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getInfiniteAnnouncementsQueryOptions } from "./get-announcements";

export const createAnnouncementInputSchema = z.object({
  content: z.string().min(1, 'Required')
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementInputSchema>;

export const createAnnouncement = ({ data } : { data : CreateAnnouncementInput }) : Promise<Announcement> => {
  return api.post('/announcements', data)
}

type useCreateAnnouncementOptions = {
  mutationConfig?: MutationConfig<typeof createAnnouncement>;
};

export const useCreateAnnouncement = ({ mutationConfig } : useCreateAnnouncementOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteAnnouncementsQueryOptions().queryKey,
      });

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createAnnouncement,
  });
}