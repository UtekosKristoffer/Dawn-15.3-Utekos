// src/Lib/State/CartModel.ts
"use client";

import { createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/react";
import "client-only";

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
    OPEN: (context: CartUIContext) => ({ ...context, open: true }),
    CLOSE: (context: CartUIContext) => ({ ...context, open: false }),
    TOGGLE: (context: CartUIContext) => ({ ...context, open: !context.open }),

    PENDING_INC: (context: CartUIContext) => ({ ...context, pending: context.pending + 1 }),
    PENDING_DEC: (context: CartUIContext) => ({
      ...context,
      pending: Math.max(0, context.pending - 1),
    }),

    SET_LAST: (context: CartUIContext, event: { type: "SET_LAST"; value: LastOp }) => ({
      ...context,
      lastOp: event.value,
    }),

    OPTIMISTIC_MERGE: (context: CartUIContext, event: { type: "OPTIMISTIC_MERGE"; delta: Record<string, number> }) => {
      const merged = { ...context.optimistic.lines };
      for (const [k, v] of Object.entries(event.delta)) {
        if (v === 0) delete merged[k];
        else merged[k] = (merged[k] ?? 0) + v;
      }
      return { ...context, optimistic: { lines: merged } };
    },

    OPTIMISTIC_CLEAR: (context: CartUIContext) => ({
      ...context,
      optimistic: { lines: {} },
    }),
  },
});

export const useCartOpen = () => useSelector(cartStore, snapshot => snapshot.context.open);
export const useCartPending = () => useSelector(cartStore, snapshot => snapshot.context.pending);
export const useCartOptimistic = () => useSelector(cartStore, snapshot => snapshot.context.optimistic);
