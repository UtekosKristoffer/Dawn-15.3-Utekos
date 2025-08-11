// src/Lib/Stores/cartStore.ts
'use client';

import { createStore } from '@xstate/store';
import type { CartLine } from '@/Types/types';

export type CartState = { lines: CartLine[] };

function upsertLine(lines: CartLine[], line: CartLine): CartLine[] {
  const i = lines.findIndex(l => l.id === line.id);
  if (i === -1) return [...lines, { ...line, quantity: Math.max(1, line.quantity) }];
  const next = [...lines];
  next[i] = { ...next[i], quantity: next[i].quantity + line.quantity };
  return next;
}
function setQuantity(lines: CartLine[], id: string, quantity: number): CartLine[] {
  if (quantity <= 0) return lines.filter(l => l.id !== id);
  return lines.map(l => (l.id === id ? { ...l, quantity } : l));
}
function adjust(lines: CartLine[], id: string, by: number): CartLine[] {
  const q = lines.find(l => l.id === id)?.quantity ?? 0;
  return setQuantity(lines, id, q + by);
}

export function createCartStore() {
  return createStore({
    context: { lines: [] } as CartState,

    // NB: v3 bruker enqueue.emit
    emits: {
      becameEmpty: () => {},
      becameNonEmpty: () => {},
    },

    on: {
      addLine: (ctx, ev: { line: CartLine }, enqueue) => {
        const wasEmpty = ctx.lines.length === 0;
        const lines = upsertLine(ctx.lines, ev.line);
        if (wasEmpty && lines.length > 0) enqueue.emit.becameNonEmpty();
        return { ...ctx, lines };
      },
      setLineQuantity: (ctx, ev: { id: string; quantity: number }, enqueue) => {
        const lines = setQuantity(ctx.lines, ev.id, ev.quantity);
        if (ctx.lines.length > 0 && lines.length === 0) enqueue.emit.becameEmpty();
        return { ...ctx, lines };
      },
      incrementLine: (ctx, ev: { id: string; by?: number }) => {
        const lines = adjust(ctx.lines, ev.id, ev.by ?? 1);
        return { ...ctx, lines };
      },
      decrementLine: (ctx, ev: { id: string; by?: number }, enqueue) => {
        const lines = adjust(ctx.lines, ev.id, -(ev.by ?? 1));
        if (ctx.lines.length > 0 && lines.length === 0) enqueue.emit.becameEmpty();
        return { ...ctx, lines };
      },
      removeLine: (ctx, ev: { id: string }, enqueue) => {
        const lines = ctx.lines.filter(l => l.id !== ev.id);
        if (ctx.lines.length > 0 && lines.length === 0) enqueue.emit.becameEmpty();
        return { ...ctx, lines };
      },
      clearCart: (ctx, _ev: {}, enqueue) => {
        if (ctx.lines.length > 0) enqueue.emit.becameEmpty();
        return { ...ctx, lines: [] };
      },
    },
  });
}

export type CartStore = ReturnType<typeof createCartStore>;

// Enkle selectors
export const selectLines = (s: CartState) => s.lines;
export const selectHasItems = (s: CartState) => s.lines.length > 0;
export const selectTotalQty = (s: CartState) => s.lines.reduce((n, l) => n + l.quantity, 0);
export const selectSubtotal = (s: CartState) => s.lines.reduce((n, l) => n + l.price * l.quantity, 0);
