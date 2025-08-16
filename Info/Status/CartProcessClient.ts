//src/Components/Cart/CartProcessClient.tsx
"use client";

import "client-only";

import { createCartProcess, type CartActions } from "@/Lib/State/CartProcess";
import { useQueryClient } from "@tanstack/react-query";
import { createActorContext } from "@xstate/react";

export const CartProcessContext = createActorContext(
  createCartProcess(
    {
      addLines: async () => ({ success: false, message: "unbound" }),
      updateLine: async () => ({ success: false, message: "unbound" }),
      removeLine: async () => ({ success: false, message: "unbound" }),
      clear: async () => ({ success: false, message: "unbound" }),
    },
    () => {}
  )
);

export default function CartProcessClient({
  actions,

  children,
}: {
  actions: CartActions;
  children: React.ReactNode;
}) {
  const QueryClient = useQueryClient();
  const invalidate = () => QueryClient.invalidateQueries({ queryKey: ["cart"] });
  return <CartProcessContext.Provider logic={createCartProcess(actions, invalidate)}>{children}</CartProcessContext.Provider>;
}
