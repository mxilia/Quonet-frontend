import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { getUserByEmailQueryOptions, getUserByHandlerQueryOptions, getUserByIdQueryOptions } from "./get-user";
import { getInfiniteUsersQueryOptions } from "./get-users";

export const updateUserInputSchema = z.object({
  handler: z.string().trim().max(16, "username cannot be longer than 16 characters long").optional().refine(
    v => v === undefined || v.length >= 1,
    "username must be at least 1 character long"
  ),
	bio: z.string().max(2000, "bio cannot be longer than 2000 characters long").optional(),
	role: z.enum(["owner", "admin", "member"]).optional(),
})
.refine(
  (data) => Object.values(data).some(v => v !== undefined && v !== ""),
  {
    message: "at least one field must be filled",
  }
);

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

export const updateUser = ({ userId, data } : { userId : string, data : UpdateUserInput }) : Promise<void> => {
  return api.patch(`/users/${userId}`, data)
}

type UpdateUserVariables = {
  userId: string;
  handler: string;
  email: string;
  data: UpdateUserInput;
}

type UseUpdateUserOptions = {
  mutationConfig?: MutationConfig<typeof updateUser>;
};

export const useUpdateUser = ({ mutationConfig } : UseUpdateUserOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation<void, Error, UpdateUserVariables>({
    onSuccess: (data, variables, _onMutateResult, _context) => {
      const { userId, handler, email } = variables;

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

      onSuccess?.(data, variables, _onMutateResult, _context);
    },
    ...restConfig,
    mutationFn: ({ userId, data }) => updateUser({ userId, data }),
  });
};

