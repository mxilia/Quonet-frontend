import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserByEmailQueryOptions, getUserByHandlerQueryOptions, getUserByIdQueryOptions } from "./get-user";
import { getInfiniteUsersQueryOptions } from "./get-users";
import { userQueryKey } from "@/lib/auth";

export const DeleteUser = ({ userId } : { userId : string }) : Promise<void> => {
  return api.delete(`/users/${userId}`)
}

type DeleteUserVariables = {
  userId: string;
  handler: string;
  email: string;
}

type useDeleteUserOptions = {
  mutationConfig?: MutationConfig<typeof DeleteUser>;
};

export const useDeleteUser = ({ mutationConfig } : useDeleteUserOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation<void, Error, DeleteUserVariables>({
    onSuccess: (data, variables, _onMutateResult, _context) => {
      const { userId, handler, email } = variables

      queryClient.invalidateQueries({
        queryKey: getUserByIdQueryOptions(userId).queryKey,
      });
      
      queryClient.invalidateQueries({
        queryKey: getUserByHandlerQueryOptions(handler).queryKey,
      })

      queryClient.invalidateQueries({
        queryKey: getUserByEmailQueryOptions(email).queryKey,
      })

      queryClient.invalidateQueries({
        queryKey: getInfiniteUsersQueryOptions().queryKey,
      })

      queryClient.removeQueries({ queryKey: userQueryKey });
      queryClient.invalidateQueries({ queryKey: userQueryKey });
  
      onSuccess?.(data, variables, _onMutateResult, _context);
    },
    ...restConfig,
    mutationFn: ({ userId }) => DeleteUser({ userId }),
  });
}