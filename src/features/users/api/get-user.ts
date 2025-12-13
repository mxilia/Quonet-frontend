import { api } from "@/lib/api-client";
import { queryConfig, QueryConfig } from "@/lib/react-query";
import { User } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

/* === Get By Id === */

export const getUserById = ({ userId } : { userId : string }) : Promise<{ data: User }> => {
  return api.get(`/users/${userId}`);
}

export const getUserByIdQueryOptions = (userId : string) => {
  return queryOptions({
    queryKey: ['users', userId],
    queryFn: () => getUserById({ userId }),
  });
}

type useUserByIdOptions = {
  userId: string;
  queryConfig?: QueryConfig<typeof getUserByIdQueryOptions>;
}

export const useUserById = ({ userId } : useUserByIdOptions) => {
  return useQuery({
    ...getUserByIdQueryOptions(userId),
    ...queryConfig,
  })
}

/* === Get By Handler === */

export const getUserByHandler = ({ handler } : { handler : string }) : Promise<{ data: User }> => {
  return api.get(`/users/handler/${handler}`);
}

export const getUserByHandlerQueryOptions = (handler : string) => {
  return queryOptions({
    queryKey: ['users', handler],
    queryFn: () => getUserByHandler({ handler }),
  });
}

type useUserByHandlerOptions = {
  handler: string;
  queryConfig?: QueryConfig<typeof getUserByHandlerQueryOptions>;
}

export const useUserByHandler = ({ handler } : useUserByHandlerOptions) => {
  return useQuery({
    ...getUserByHandlerQueryOptions(handler),
    ...queryConfig,
  })
}

/* === Get By Email === */

export const getUserByEmail = ({ email } : { email : string }) : Promise<{ data: User }> => {
  return api.get(`/users/email/${email}`);
}

export const getUserByEmailQueryOptions = (email : string) => {
  return queryOptions({
    queryKey: ['users', email],
    queryFn: () => getUserByEmail({ email }),
  });
}

type useUserByEmailOptions = {
  email: string;
  queryConfig?: QueryConfig<typeof getUserByEmailQueryOptions>;
}

export const useUserByEmail = ({ email } : useUserByEmailOptions) => {
  return useQuery({
    ...getUserByEmailQueryOptions(email),
    ...queryConfig,
  })
}