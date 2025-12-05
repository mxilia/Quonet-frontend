'use client';

import { ErrorBoundary } from "react-error-boundary";
import { MainErrorFallBack } from "@/components/errors/main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { queryConfig } from "@/lib/react-query";

type AppProviderProps = {
  children: React.ReactNode,
};

export const AppProvider = ({ children } : AppProviderProps) => {
  const [queryClient] = React.useState(() => new QueryClient({defaultOptions: queryConfig,}));

  return (
    <ErrorBoundary FallbackComponent={MainErrorFallBack}>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
        
        {children}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}