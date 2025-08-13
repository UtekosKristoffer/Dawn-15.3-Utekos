// src/lib/state/cartUiMachine.ts
"use client";
import ADD_LINES from "@/Server/DAL/Cart/addLines";
import REMOVE_CART_LINE from "@/Server/DAL/Cart/removeCartLine";
import UPDATE_LINES from "@/Server/DAL/Cart/updateLines";
import CLEAR_CART from "@/Server/DAL/Cart/clearCart";

import type { CompleteCartFragment as Cart } from "@/GraphQL/Fragments/CartFragment.generated";
// src/lib/state/cartUiMachine.ts

import { setup, assign, fromPromise, assertEvent } from "xstate";
import { cartDataActor } from "./cartDataActor";

const addLines = fromPromise<
  CART_ACTION_RESULT,
  { merchandiseId: string; quantity: number }
>(async ({ input }) => {
  const result = await ADD_LINES(undefined as any, input);
  return result; // returner CART_ACTION_RESULT
});

const removeLine = fromPromise<CART_ACTION_RESULT, { lineId: string }>(
  async ({ input }) => {
    return await REMOVE_CART_LINE(undefined as any, input);
  }
);
const updateLine = fromPromise<
  CART_ACTION_RESULT,
  { lineId: string; quantity: number }
>(async ({ input }) => {
  return await UPDATE_LINES(undefined as any, input);
});

const clearCart = fromPromise<CART_ACTION_RESULT, void>(async () => {
  return await CLEAR_CART(undefined as any);
});

export const cartUiMachine = setup({
  types: {
    context: {} as { isDrawerOpen: boolean; error: string | null },
    events: {} as
      | { type: "OPEN_DRAWER" }
      | { type: "CLOSE_DRAWER" }
      | { type: "ADD_ITEM"; merchandiseId: string; quantity: number }
      | { type: "REMOVE_ITEM"; lineId: string }
      | { type: "UPDATE_ITEM_QUANTITY"; lineId: string; quantity: number }
      | { type: "CLEAR_CART" },
    children: {} as {
      addLines: "addLines";
      removeLine: "removeLine";
      updateLine: "updateLine";
      clearCart: "clearCart";
    },
  },
  actors: { addLines, removeLine, updateLine, clearCart },
  actions: {
    openDrawer: assign({ isDrawerOpen: true }),
    closeDrawer: assign({ isDrawerOpen: false }),
    syncCart: ({ event }) => {
      // event.output er sterkt typet til Cart:contentReference[oaicite:4]{index=4}
      cartDataActor.send({ type: "SYNC_CART", cart: event.output });
    },
  },
}).createMachine({
  id: "cartUi",
  initial: "idle",
  context: { isDrawerOpen: false, error: null },
  on: {
    OPEN_DRAWER: { actions: "openDrawer" },
    CLOSE_DRAWER: { actions: "closeDrawer" },
  },
  states: {
    idle: {
      on: {
        ADD_ITEM: "adding",
        REMOVE_ITEM: "removing",
        UPDATE_ITEM_QUANTITY: "updating",
        CLEAR_CART: "clearing",
      },
    },
    adding: {
      invoke: {
        src: "addLines",
        id: "addLines",
        input: ({ event }) => {
          assertEvent(event, "ADD_ITEM");
          return {
            merchandiseId: event.merchandiseId,
            quantity: event.quantity,
          };
        },
        onDone: {
          target: "idle",
          actions: ({ event }) => {
            cartDataActor.send({
              type: "SYNC_CART",
              cart: event.output.cart ?? null,
            });
          },
        },
        onError: {
          target: "idle",
          actions: ({ event }) => {
            cartDataActor.send({ type: "SYNC_CART", cart: null });
          },
        },
      },
    },
    removing: {
      invoke: {
        src: "removeLine",
        id: "removeLine",
        input: ({ event }) => ({
          lineId: event.lineId,
        }),
        onDone: {
          target: "idle",
          actions: ({ event }) => {
            cartDataActor.send({
              type: "SYNC_CART",
              cart: event.output.cart ?? null,
            });
          },
        },
      },
    },
    updating: {
      invoke: {
        src: "updateLine",
        id: "updateLine",
        input: ({ event }) => ({
          lineId: event.lineId,
          quantity: event.quantity,
        }),
        onDone: {
          target: "idle",
          actions: ({ event }) => {
            cartDataActor.send({
              type: "SYNC_CART",
              cart: event.output.cart ?? null,
            });
          },
        },
        onError: {
          target: "idle",
          actions: () => cartDataActor.send({ type: "SYNC_CART", cart: null }),
        },
      },
    },
    clearing: {
      invoke: {
        src: "clearCart",
        id: "clearCart",
        onDone: {
          target: "idle",
          actions: ({ event }) => {
            cartDataActor.send({
              type: "SYNC_CART",
              cart: event.output.cart ?? null,
            });
          },
        },
        onError: {
          target: "idle",
          actions: () => cartDataActor.send({ type: "SYNC_CART", cart: null }),
        },
      },
    },
  },
});
