// src/Components/Providers.tsx
"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import getQueryClient from "@/ServerFunctions/getQueryClient";
import { CartProcessContext } from "../Cart/CartProcessClient";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <CartProcessContext.Provider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CartProcessContext.Provider>
  );
}
