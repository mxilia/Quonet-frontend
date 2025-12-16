import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api-client";
import { User } from "@/types/api";

/* === Get User ===*/

export const getUser = async () : Promise<User | null> => {
  try {
    const response : User = await api.get('/me');
    if(response === undefined) return null;
    return response;
  } catch(error : any) {
    if(error.status === 401) return null;
  }
  return null;
};

const userQueryKey = ['user'];

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getUser,
  });
};

export const useUser = () => useQuery(getUserQueryOptions());

/* === Log Out ===*/

const logout = (): Promise<void> => {
  return api.post('/auth/logout');
};

export const useLogout = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userQueryKey });
      queryClient.invalidateQueries({ queryKey: userQueryKey });
      onSuccess?.();
    },
  });
};

