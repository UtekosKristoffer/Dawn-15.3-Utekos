// src/lib/state/cartUiMachine.ts
"use client";
import ADD_LINES from "@/Server/DAL/Cart/addLines";
import REMOVE_CART_LINE from "@/Server/DAL/Cart/removeCartLine";
import UPDATE_LINES from "@/Server/DAL/Cart/updateLines";
import CLEAR_CART from "@/Server/DAL/Cart/clearCart";
import { setup, assign, assertEvent } from "xstate";
import { cartDataActor } from "./cartDataActor";
import { serverActionActor } from "@/Helpers/serverActionActor";

const addLines = serverActionActor<{ merchandiseId: string; quantity: number }>(
  ADD_LINES
);
const removeLine = serverActionActor<{ lineId: string }>(REMOVE_CART_LINE);
const updateLine = serverActionActor<{ lineId: string; quantity: number }>(
  UPDATE_LINES
);
const clearCart = serverActionActor<void>(CLEAR_CART);

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
          actions: () => {
            cartDataActor.send({ type: "SYNC_CART", cart: null });
          },
        },
      },
    },
    removing: {
      invoke: {
        src: "removeLine",
        id: "removeLine",
        input: ({ event }) => {
          assertEvent(event, "REMOVE_ITEM");
          return { lineId: event.lineId };
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
          actions: () => {
            cartDataActor.send({ type: "SYNC_CART", cart: null });
          },
        },
      },
    },
    updating: {
      invoke: {
        src: "updateLine",
        id: "updateLine",
        input: ({ event }) => {
          assertEvent(event, "UPDATE_ITEM_QUANTITY");
          return { lineId: event.lineId, quantity: event.quantity };
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
          actions: () => {
            cartDataActor.send({ type: "SYNC_CART", cart: null });
          },
        },
      },
    },
    clearing: {
      invoke: {
        src: "clearCart",
        id: "clearCart",
        input: ({ event }) => {
          assertEvent(event, "CLEAR_CART");
          return; // ingen input
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
          actions: () => {
            cartDataActor.send({ type: "SYNC_CART", cart: null });
          },
        },
      },
    },
  },
});
