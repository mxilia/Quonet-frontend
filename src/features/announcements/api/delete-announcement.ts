import { api } from "@/lib/api-client";
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getInfiniteAnnouncementsQueryOptions } from "./get-announcements";

export const deleteAnnouncement = ({ announcementId } : { announcementId : string }) : Promise<void> => {
  return api.delete(`/Announcements/${announcementId}`)
}

type DeleteAnnouncementVariables = {
  announcementId: string;
};

type useDeleteAnnouncementOptions = {
  mutationConfig?: MutationConfig<typeof deleteAnnouncement>;
};

export const useDeleteAnnouncement = ({ mutationConfig } : useDeleteAnnouncementOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation<void, Error, DeleteAnnouncementVariables>({
    onSuccess: (...args) => {

      queryClient.invalidateQueries({
        queryKey: getInfiniteAnnouncementsQueryOptions().queryKey,
      });
      
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: ({ announcementId }) => deleteAnnouncement({ announcementId }),
  });
}