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


"use client";
import "client-only"
import { createMachine, setup, fromPromise } from "xstate";
import * as actions from "@/ServerFunctions/Cart/actions";
import { cartStore } from "@/Lib/State/CartModel";

export type CartActions = {
  addLines(input: {
    merchandiseId: string;
    quantity: number;
  }): Promise<CART_ACTION_RESULT>;
  updateLine(input: {
    lineId: string;
    quantity: number;
  }): Promise<CART_ACTION_RESULT>;
  removeLine(input: { lineId: string }): Promise<CART_ACTION_RESULT>;
  clear(): Promise<CART_ACTION_RESULT>;
};

type EAdd = {
  type: "ADD_LINES";
  input: { merchandiseId: string; quantity: number };
};
type EUpdate = {
  type: "UPDATE_LINE";
  input: { lineId: string; quantity: number };
};
type ERemove = { type: "REMOVE_LINE"; input: { lineId: string } };
type EClear = { type: "CLEAR" };

export const cartProcess = createMachine(
  {
    id: "cartProcess",
    initial: "idle",
    states: {
      idle: {
        on: {
          ADD_LINES: "adding",
          UPDATE_LINE: "updating",
          REMOVE_LINE: "removing",
          CLEAR: "clearing",
        },
      },
      adding: { invoke: { src: "addLines", onDone: "idle", onError: "idle" } },
      updating: {
        invoke: { src: "updateLine", onDone: "idle", onError: "idle" },
      },
      removing: {
        invoke: { src: "removeLine", onDone: "idle", onError: "idle" },
      },
      clearing: { invoke: { src: "clear", onDone: "idle", onError: "idle" } },
    },
  },
  {
    actors: {
      addLines: fromPromise<CART_ACTION_RESULT, EAdd["input"]>(({ input }) =>
        actions.addLines(input)
      ),
      updateLine: fromPromise<CART_ACTION_RESULT, EUpdate["input"]>(
        ({ input }) => actions.updateLine(input)
      ),
      removeLine: fromPromise<CART_ACTION_RESULT, ERemove["input"]>(
        ({ input }) => actions.removeLine(input)
      ),
      clear: fromPromise<CART_ACTION_RESULT, void>(() => actions.clear()),
    },
  }
);

export const createCartProcess = (
  actions: CartActions,
  onCartUpdated: () => void
) =>
  setup({
    types: {
      context: {} as {},
      events: {} as EAdd | EUpdate | ERemove | EClear,
    },
    actors: {
      addLines: fromPromise<CART_ACTION_RESULT, EAdd["input"]>(({ input }) =>
        actions.addLines(input)
      ),
      updateLine: fromPromise<CART_ACTION_RESULT, EUpdate["input"]>(
        ({ input }) => actions.updateLine(input)
      ),
      removeLine: fromPromise<CART_ACTION_RESULT, ERemove["input"]>(
        ({ input }) => actions.removeLine(input)
      ),
      clear: fromPromise<CART_ACTION_RESULT>(() => actions.clear()),
    },
    actions: {
      inc: () => cartStore.send({ type: "PENDING_INC" }),
      dec: () => cartStore.send({ type: "PENDING_DEC" }),
      last: ({ event }) => {
        const any = event as EAdd | EUpdate | ERemove | EClear;
        cartStore.send({
          type: "SET_LAST",
          value: {
            type: any.type.toLowerCase() as any,
            at: Date.now(),
            payload: (any as any).input,
          },
        });
      },
      optimisticAdd: ({ event }) => {
        const e = event as EAdd;
        cartStore.send({
          type: "OPTIMISTIC_MERGE",
          delta: { [e.input.merchandiseId]: e.input.quantity },
        });
      },
      optimisticRemove: ({ event }) => {
        const e = event as ERemove;
        cartStore.send({
          type: "OPTIMISTIC_MERGE",
          delta: { [e.input.lineId]: 0 },
        });
      },
      clearOptimistic: () => cartStore.send({ type: "OPTIMISTIC_CLEAR" }),
      notifyUpdate: () => {
        cartStore.send({ type: "OPTIMISTIC_CLEAR" });
        onCartUpdated();
      },
      notifyError: ({ event }) => {
        console.error(event);
      },
    },
  }).createMachine({
    id: "cartProcess",
    initial: "idle",
    states: {
      idle: {
        on: {
          ADD_LINES: {
            target: "adding",
            actions: ["inc", "optimisticAdd", "last"],
          },
          UPDATE_LINE: { target: "updating", actions: ["inc", "last"] },
          REMOVE_LINE: {
            target: "removing",
            actions: ["inc", "optimisticRemove", "last"],
          },
          CLEAR: {
            target: "clearing",
            actions: ["inc", "clearOptimistic", "last"],
          },
        },
      },
      adding: {
        invoke: {
          src: "addLines",
          input: ({ event }) => (event as EAdd).input,
          onDone: { target: "idle", actions: ["dec", "notifyUpdate"] },
          onError: { target: "idle", actions: ["dec", "notifyError"] },
        },
      },
      updating: {
        invoke: {
          src: "updateLine",
          input: ({ event }) => (event as EUpdate).input,
          onDone: { target: "idle", actions: ["dec", "notifyUpdate"] },
          onError: { target: "idle", actions: ["dec", "notifyError"] },
        },
      },
      removing: {
        invoke: {
          src: "removeLine",
          input: ({ event }) => (event as ERemove).input,
          onDone: { target: "idle", actions: ["dec", "notifyUpdate"] },
          onError: { target: "idle", actions: ["dec", "notifyError"] },
        },
      },
      clearing: {
        invoke: {
          src: "clear",
          onDone: { target: "idle", actions: ["dec", "notifyUpdate"] },
          onError: { target: "idle", actions: ["dec", "notifyError"] },
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


// src/ServerFunctions/Cart/CartFromAsyncedCookiesQuery.ts
import { unstable_cache } from "next/cache";
import {
  GetCartDocument,
  type GetCartQuery,
  type GetCartQueryVariables,
} from "@/GraphQL/Queries/GetCart.generated";
import StoreFrontApiClient from "@/Lib/Clients/StoreFrontApiClient";
import { GraphqlQueryError } from "@shopify/shopify-api";

async function queryShopify<TResult, TVars extends Record<string, any>>(
  query: string,
  variables?: TVars
): Promise<TResult> {
  const res = await StoreFrontApiClient.request<TResult>(query, {
    variables,
    retries: 2,
  });
  if ((res as any).errors) {
    throw new GraphqlQueryError({
      message: (res as any).errors.message ?? "GraphQL error",
      response: res as any,
      body: (res as any).errors.graphQLErrors as Record<string, any>,
    });
  }
  if (!res.data) throw new Error("No data from Shopify");
  return res.data;
}

export const CART_FROM_ASYNCED_COOKIESQUERY = unstable_cache(
  async (cartId: string) => {
    const data = await queryShopify<GetCartQuery, GetCartQueryVariables>(
      GetCartDocument,
      { cartId }
    );
    return data.cart ?? null;
  },
  ["cart"],
  { tags: ["cart"] }
);
