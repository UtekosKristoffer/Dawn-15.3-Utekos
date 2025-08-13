// src/Lib/Stores/cartStore.ts
"use client";

import { createStore } from "@xstate/store";
import type { CartLine } from "@/Types/types";

export type CartState = { lines: CartLine[] };

function upsertLine(lines: CartLine[], line: CartLine): CartLine[] {
  const i = lines.findIndex((l) => l.id === line.id);
  if (i === -1)
    return [...lines, { ...line, quantity: Math.max(1, line.quantity) }];
  const next = [...lines];
  next[i] = { ...next[i], quantity: next[i].quantity + line.quantity };
  return next;
}
function setQuantity(
  lines: CartLine[],
  id: string,
  quantity: number
): CartLine[] {
  if (quantity <= 0) return lines.filter((l) => l.id !== id);
  return lines.map((l) => (l.id === id ? { ...l, quantity } : l));
}
function adjust(lines: CartLine[], id: string, by: number): CartLine[] {
  const q = lines.find((l) => l.id === id)?.quantity ?? 0;
  return setQuantity(lines, id, q + by);
}

export function createCartStore() {
  return createStore({
    context: { lines: [] } as CartState,

    emits: {
      becameEmpty: () => {},
      becameNonEmpty: () => {},
    },

    on: {
      addLine: (CartContext, ev: { line: CartLine }, enqueue) => {
        const wasEmpty = CartContext.lines.length === 0;
        const lines = upsertLine(CartContext.lines, ev.line);
        if (wasEmpty && lines.length > 0) enqueue.emit.becameNonEmpty();
        return { ...CartContext, lines };
      },
      setLineQuantity: (
        CartContext,
        ev: { id: string; quantity: number },
        enqueue
      ) => {
        const lines = setQuantity(CartContext.lines, ev.id, ev.quantity);
        if (CartContext.lines.length > 0 && lines.length === 0)
          enqueue.emit.becameEmpty();
        return { ...CartContext, lines };
      },
      incrementLine: (CartContext, ev: { id: string; by?: number }) => {
        const lines = adjust(CartContext.lines, ev.id, ev.by ?? 1);
        return { ...CartContext, lines };
      },
      decrementLine: (
        CartContext,
        ev: { id: string; by?: number },
        enqueue
      ) => {
        const lines = adjust(CartContext.lines, ev.id, -(ev.by ?? 1));
        if (CartContext.lines.length > 0 && lines.length === 0)
          enqueue.emit.becameEmpty();
        return { ...CartContext, lines };
      },
      removeLine: (CartContext, ev: { id: string }, enqueue) => {
        const lines = CartContext.lines.filter((l) => l.id !== ev.id);
        if (CartContext.lines.length > 0 && lines.length === 0)
          enqueue.emit.becameEmpty();
        return { ...CartContext, lines };
      },
      clearCart: (CartContext, _ev: {}, enqueue) => {
        if (CartContext.lines.length > 0) enqueue.emit.becameEmpty();
        return { ...CartContext, lines: [] };
      },
    },
  });
}

export type CartStore = ReturnType<typeof createCartStore>;

export const selectLines = (s: CartState) => s.lines;
export const selectHasItems = (s: CartState) => s.lines.length > 0;
export const selectTotalQty = (s: CartState) =>
  s.lines.reduce((n, l) => n + l.quantity, 0);
export const selectSubtotal = (snapshot: { context: CartState }) => snapshot.context.cart?.cost.subtotalAmount ?? null;
