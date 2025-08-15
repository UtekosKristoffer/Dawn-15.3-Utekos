// src/Lib/State/cartStore.ts
"use client";

import { createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/react";

type Optimistic = { lines: Record<string, number> };
type LastOp = {
  type: "add" | "update" | "remove" | "clear";
  at: number;
  payload?: unknown;
};

export type CartUIContext = {
  open: boolean;
  pending: number;
  lastOp?: LastOp;
  optimistic: Optimistic;
};

// Payload‑map, ikke union:
type UIEventMap = {
  OPEN: {};
  CLOSE: {};
  TOGGLE: {};
  PENDING_INC: {};
  PENDING_DEC: {};
  SET_LAST: { value: LastOp };
  OPTIMISTIC_MERGE: { delta: Record<string, number> };
  OPTIMISTIC_CLEAR: {};
};

// Ingen emits fra store:
type EmittedMap = {};

export const cartStore = createStore<CartUIContext, UIEventMap, EmittedMap>({
  context: {
    open: false,
    pending: 0,
    lastOp: undefined,
    optimistic: { lines: {} },
  },
  on: {
    OPEN: (c: CartUIContext) => ({ ...c, open: true }),
    CLOSE: (c: CartUIContext) => ({ ...c, open: false }),
    TOGGLE: (c: CartUIContext) => ({ ...c, open: !c.open }),

    PENDING_INC: (c: CartUIContext) => ({ ...c, pending: c.pending + 1 }),
    PENDING_DEC: (c: CartUIContext) => ({
      ...c,
      pending: Math.max(0, c.pending - 1),
    }),

    SET_LAST: (c: CartUIContext, e: { type: "SET_LAST"; value: LastOp }) => ({
      ...c,
      lastOp: e.value,
    }),

    OPTIMISTIC_MERGE: (
      c: CartUIContext,
      e: { type: "OPTIMISTIC_MERGE"; delta: Record<string, number> }
    ) => {
      const merged = { ...c.optimistic.lines };
      for (const [k, v] of Object.entries(e.delta)) {
        if (v === 0) delete merged[k];
        else merged[k] = (merged[k] ?? 0) + v;
      }
      return { ...c, optimistic: { lines: merged } };
    },

    OPTIMISTIC_CLEAR: (c: CartUIContext) => ({
      ...c,
      optimistic: { lines: {} },
    }),
  },
});

export const useCartOpen = () => useSelector(cartStore, (s) => s.context.open);
export const useCartPending = () =>useSelector(cartStore, (s) => s.context.pending);
export const useCartOptimistic = () =>  useSelector(cartStore, (s) => s.context.optimistic);



//Lib/State/CarteMachineUI.ts
"use client";

import ADD_LINES from "@/ServerFunctions/Cart/addLines";
import REMOVE_CART_LINE from "@/ServerFunctions/Cart/removeCartLine";
import UPDATE_LINES from "@/ServerFunctions/Cart/UPPDATE_LINES";
import CLEAR_CART from "@/ServerFunctions//Cart/clearCart";
import { setup, assign, assertEvent } from "xstate";
import { CartDataActor } from "./CartDataActor";
import serverActionActor from "@/Helpers/serverActionActor";

const addLines = serverActionActor<{ merchandiseId: string; quantity: number }>(
  ADD_LINES
);
const removeLine = serverActionActor<{ lineId: string }>(REMOVE_CART_LINE);
const updateLine = serverActionActor<{ lineId: string; quantity: number }>(
  UPDATE_LINES
);
const clearCart = serverActionActor<void>(CLEAR_CART);

export const CartMachineUI = setup({
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
      tags: "busy",
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
            CartDataActor.send({
              type: "SYNC_CART",
              cart: event.output.cart ?? null,
            });
          },
        },
        onError: {
          target: "idle",
          actions: () => {
            CartDataActor.send({ type: "SYNC_CART", cart: null });
          },
        },
      },
    },
    removing: {
      tags: "busy",
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
            CartDataActor.send({
              type: "SYNC_CART",
              cart: event.output.cart ?? null,
            });
          },
        },
        onError: {
          target: "idle",
          actions: () => {
            CartDataActor.send({ type: "SYNC_CART", cart: null });
          },
        },
      },
    },
    updating: {
      tags: "busy",
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
            CartDataActor.send({
              type: "SYNC_CART",
              cart: event.output.cart ?? null,
            });
          },
        },
        onError: {
          target: "idle",
          actions: () => {
            CartDataActor.send({ type: "SYNC_CART", cart: null });
          },
        },
      },
    },
    clearing: {
      tags: "busy",
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
            CartDataActor.send({
              type: "SYNC_CART",
              cart: event.output.cart ?? null,
            });
          },
        },
        onError: {
          target: "idle",
          actions: () => {
            CartDataActor.send({ type: "SYNC_CART", cart: null });
          },
        },
      },
    },
  },
});


//CartProcessClient.ts
"use client";
import { createActorContext } from "@xstate/react";
import { useQueryClient } from "@tanstack/react-query";
import { createCartProcess, type CartActions } from "@/Lib/State/CartProcess";
import { fromPromise, createMachine } from "xstate";
import * as action from "@/ServerFunctions/Cart/actions"

type EAdd    = { type: 'ADD_LINES';  input: { merchandiseId: string; quantity: number } };
type EUpdate = { type: 'UPDATE_LINE'; input: { lineId: string; quantity: number } };
type ERemove = { type: 'REMOVE_LINE'; input: { lineId: string } };
type EClear  = { type: 'CLEAR' };

export const cartProcess = createMachine({
  id: 'cartProcess',
  initial: 'idle',
  states: {
    idle: { on: { ADD_LINES: 'adding', UPDATE_LINE: 'updating', REMOVE_LINE: 'removing', CLEAR: 'clearing' } },
    adding:   { invoke: { src: 'addLines',   onDone: 'idle', onError: 'idle' } },
    updating: { invoke: { src: 'updateLine', onDone: 'idle', onError: 'idle' } },
    removing: { invoke: { src: 'removeLine', onDone: 'idle', onError: 'idle' } },
    clearing: { invoke: { src: 'clear',      onDone: 'idle', onError: 'idle' } },
  },
}, {
  actors: {
    addLines:   fromPromise<CART_ACTION_RESULT, EAdd['input']>(({ input }) => actions.addLines(input)),
    updateLine: fromPromise<CART_ACTION_RESULT, EUpdate['input']>(({ input }) => actions.updateLine(input)),
    removeLine: fromPromise<CART_ACTION_RESULT, ERemove['input']>(({ input }) => actions.removeLine(input)),
    clear:      fromPromise<CART_ACTION_RESULT, void>(() => actions.clear()),
  },
});

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
  const invalidate = () =>
    QueryClient.invalidateQueries({ queryKey: ["cart"] });
  return (
    <CartProcessContext.Provider logic={createCartProcess(actions, invalidate)}>
      {children}
    </CartProcessContext.Provider>
  );
}



// src/ServerActions/Cart/actions.ts
'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import type { Cart } from '@/GraphQL/schema';
import {
  CartCreateDocument,
  type CartCreateMutation,
  type CartCreateMutationVariables,
  CartLinesAddDocument,
  type CartLinesAddMutation,
  type CartLinesAddMutationVariables,
  CartLinesUpdateDocument,
  type CartLinesUpdateMutation,
  type CartLinesUpdateMutationVariables,
  CartLinesRemoveDocument,
  type CartLinesRemoveMutation,
  type CartLinesRemoveMutationVariables,
  CartClearDocument,
  type CartClearMutation,
  type CartClearMutationVariables,
} from '@/GraphQL/Mutations/CartMutations.generated';
import { ShopifyRequestClient } from '@/Lib/Clients/ShopifyRequestClient';

type Result = {
  success: boolean;
  message: string;
  cart?: Cart | null;
  error?: string | null;
};

async function ensureCartId(): Promise<string> {
  const store = await cookies(); // Next 15: async API
  let id = store.get('cartId')?.value;

  if (!id) {
    const run = ShopifyRequestClient<
      CartCreateMutation,
      CartCreateMutationVariables
    >(CartCreateDocument, { input: {} as CartCreateMutationVariables['input'] });

    const data = await run();
    id = data.cartCreate?.cart?.id ?? '';
    if (!id) throw new Error('CartCreate returned no id');

    store.set({
      name: 'cartId',
      value: id,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    }); // korrekt signatur i Next 15 cookies API
  }

  return id;
}

/** Generisk mutasjon som normaliserer til Cart via selector */
async function mutateCart<TData, TVars extends Record<string, any>>(
  doc: any,
  vars: TVars,
  pickCart: (data: NonNullable<TData>) => Cart | null,
): Promise<Cart | null> {
  const run = ShopifyRequestClient<TData, TVars>(doc, vars);
  const data = (await run()) as NonNullable<TData>;
  revalidateTag('cart'); // ISR via tag
  return pickCart(data);
}

export async function addLines(input: {
  merchandiseId: string;
  quantity: number;
}): Promise<Result> {
  try {
    const cartId = await ensureCartId();
    const cart = await mutateCart<CartLinesAddMutation, CartLinesAddMutationVariables>(
      CartLinesAddDocument,
      { cartId, lines: [{ merchandiseId: input.merchandiseId, quantity: input.quantity }] },
      d => d.cartLinesAdd?.cart ?? null,
    );
    return { success: true, message: 'OK', cart };
  } catch (e: any) {
    return { success: false, message: e?.message ?? 'Feil', error: e?.message ?? 'Feil' };
  }
}

export async function updateLine(input: {
  lineId: string;
  quantity: number;
}): Promise<Result> {
  try {
    const cartId = await ensureCartId();
    const cart = await mutateCart<CartLinesUpdateMutation, CartLinesUpdateMutationVariables>(
      CartLinesUpdateDocument,
      { cartId, lines: [{ id: input.lineId, quantity: input.quantity }] },
      d => d.cartLinesUpdate?.cart ?? null,
    );
    return { success: true, message: 'OK', cart };
  } catch (e: any) {
    return { success: false, message: e?.message ?? 'Feil', error: e?.message ?? 'Feil' };
  }
}

export async function removeLine(input: { lineId: string }): Promise<Result> {
  try {
    const cartId = await ensureCartId();
    const cart = await mutateCart<CartLinesRemoveMutation, CartLinesRemoveMutationVariables>(
      CartLinesRemoveDocument,
      { cartId, lineIds: [input.lineId] }, // lineIds er påkrevd
      d => d.cartLinesRemove?.cart ?? null,
    );
    return { success: true, message: 'OK', cart };
  } catch (e: any) {
    return { success: false, message: e?.message ?? 'Feil', error: e?.message ?? 'Feil' };
  }
}

export async function clear(): Promise<Result> {
  try {
    const cartId = await ensureCartId();
    const cart = await mutateCart<CartClearMutation, CartClearMutationVariables>(
      CartClearDocument,
      { cartId },
      d => d.cartClear?.cart ?? null,
    );
    return { success: true, message: 'OK', cart };
  } catch (e: any) {
    return { success: false, message: e?.message ?? 'Feil', error: e?.message ?? 'Feil' };
  }
}


