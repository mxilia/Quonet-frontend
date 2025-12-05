import { UseMutationOptions, DefaultOptions } from '@tanstack/react-query';

// Query config (GET)
export const queryConfig = {
  queries: {
    // throwOnError: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions;

// Resolve promise to actual data.
export type ApiFnReturnType
<
  FnType extends (...args: any) => Promise<any>
> 
= Awaited<ReturnType<FnType>>;

// When used, this will remove things that are not configs like return value, queryKey and queryFn, at least for this case.
export type QueryConfig
<
  T extends (...args: any[]) => any
> 
= Omit<ReturnType<T>, 'queryKey' | 'queryFn'>;

// Mutation config (POST/PATCH/DELETE)
export type MutationConfig
<
  MutationFnType extends(...args : any) => Promise<any>
> 
= UseMutationOptions<ApiFnReturnType<MutationFnType>, Error, Parameters<MutationFnType>[0]>; 
// Params: <return type of mutation, error type, arg type of mutation>