// src/lib/state/cartDataMachine.ts
import { setup, assign } from "xstate";
import type { CompleteCartFragment as Cart } from "@/GraphQL/Fragments/CartFragment.generated";

export const cartDataMachine = setup({
  types: {
    context: {} as { cart: Cart | null },
    events: {} as { type: "SYNC_CART"; cart: Cart | null },
  },
}).createMachine({
  id: "cartData",
  initial: "ready",
  context: { cart: null },
  states: {
    ready: {
      on: {
        SYNC_CART: {
          actions: assign({
            cart: ({ event }) => event.cart,
          }),
        },
      },
    },
  },
});
