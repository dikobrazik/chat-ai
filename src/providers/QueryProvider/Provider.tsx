"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

export const QueryProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchInterval: (query) => {
            console.log("fetchFailureCount", query.state.fetchFailureCount);
            return query.state.fetchFailureCount ** 2 * 1000;
          }, // exponential backoff: 10s, 20s, 30s, ...
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
