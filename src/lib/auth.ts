import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api-client";
import { User } from "@/types/api";

export const getUser = async (): Promise<User> => {
  const response = (await api.get('/me')) as { data: User };

  return response.data;
};

const userQueryKey = ['user'];

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getUser,
  });
};

export const useUser = () => useQuery(getUserQueryOptions());

/*
const googleEntry = () : Promise<LoginResponse> => {
  return api.post('/auth/google/login');
};

export const useLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: googleEntry,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data.user);
      sessionStorage.setItem("access_token", data.access_token)
      onSuccess?.();
    },
  });
};
*/