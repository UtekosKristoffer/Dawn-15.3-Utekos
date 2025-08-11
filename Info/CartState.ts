export type Minor = number; // øre/cent
export type CartLine = {
  id: string;            // linje-id (egen eller fra Shopify)
  title: string;
  price: Minor;          // pris per stk i minor units
  quantity: number;
  imageUrl?: string;
  merchandiseId?: string; // Shopify variant/id
};



import { createStore } from '@xstate/store';

import type { CartLine } from '../types';

type Ctx = { lines: CartLine[] };

type Ev =
  | { type: 'cart/addLine'; line: CartLine }
  | { type: 'cart/setQty'; id: string; quantity: number }
  | { type: 'cart/increment'; id: string; by?: number }
  | { type: 'cart/decrement'; id: string; by?: number }
  | { type: 'cart/removeLine'; id: string }
  | { type: 'cart/clear' };

// Pure helpers
function upsertLine(lines: CartLine[], line: CartLine): CartLine[] {
  const idx = lines.findIndex(l => l.id === line.id);
  if (idx === -1) return [...lines, line];
  const next = lines.slice();
  next[idx] = { ...next[idx], quantity: next[idx].quantity + line.quantity };
  return next.filter(l => l.quantity > 0);
}
function setQty(lines: CartLine[], id: string, q: number): CartLine[] {
  if (q <= 0) return removeLine(lines, id);
  return lines.map(l => (l.id === id ? { ...l, quantity: q } : l));
}
function adjustQty(lines: CartLine[], id: string, by: number): CartLine[] {
  return setQty(
    lines,
    id,
    Math.max(0, (lines.find(l => l.id === id)?.quantity ?? 0) + by),
  );
}
function removeLine(lines: CartLine[], id: string): CartLine[] {
  return lines.filter(l => l.id !== id);
}

// Store
const store = createStore<Ctx, Ev>({
  context: { lines: [] },
  emits: {
    changed: (_: { reason: 'add' | 'update' | 'remove' | 'clear'; id?: string }) => {},
    becameEmpty: () => {},
    becameNonEmpty: () => {},
  },
  on: {
    'cart/addLine': (ctx, ev, enqueue) => {
      const wasEmpty = ctx.lines.length === 0;
      const lines = upsertLine(ctx.lines, ev.line);
      if (wasEmpty && lines.length > 0) enqueue.emit.becameNonEmpty();
      enqueue.emit.changed({ reason: 'add', id: ev.line.id });
      return { ...ctx, lines };
    },
    'cart/setQty': (ctx, ev, enqueue) => {
      const lines = setQty(ctx.lines, ev.id, ev.quantity);
      if (ctx.lines.length > 0 && lines.length === 0) enqueue.emit.becameEmpty();
      enqueue.emit.changed({ reason: 'update', id: ev.id });
      return { ...ctx, lines };
    },
    'cart/increment': (ctx, ev, enqueue) => {
      const lines = adjustQty(ctx.lines, ev.id, ev.by ?? 1);
      if (ctx.lines.length > 0 && lines.length === 0) enqueue.emit.becameEmpty();
      enqueue.emit.changed({ reason: 'update', id: ev.id });
      return { ...ctx, lines };
    },
    'cart/decrement': (ctx, ev, enqueue) => {
      const lines = adjustQty(ctx.lines, ev.id, -(ev.by ?? 1));
      if (ctx.lines.length > 0 && lines.length === 0) enqueue.emit.becameEmpty();
      enqueue.emit.changed({ reason: 'update', id: ev.id });
      return { ...ctx, lines };
    },
    'cart/removeLine': (ctx, ev, enqueue) => {
      const lines = removeLine(ctx.lines, ev.id);
      if (ctx.lines.length > 0 && lines.length === 0) enqueue.emit.becameEmpty();
      enqueue.emit.changed({ reason: 'remove', id: ev.id });
      return { ...ctx, lines };
    },
    'cart/clear': (ctx, _ev, enqueue) => {
      if (ctx.lines.length > 0) enqueue.emit.becameEmpty();
      enqueue.emit.changed({ reason: 'clear' });
      return { ...ctx, lines: [] };
    },
  },
});

// Selectors (avledede verdier)
export const selectLines = (s: { context: Ctx }) => s.context.lines;
export const selectItemCount = (s: { context: Ctx }) =>
  s.context.lines.reduce((n, l) => n + l.quantity, 0);
export const selectSubtotalMinor = (s: { context: Ctx }) =>
  s.context.lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
export const selectHasItems = (s: { context: Ctx }) => s.context.lines.length > 0;

// Triggers for ergonomi
export const cartTriggers = {
  addLine: (line: CartLine) => store.send({ type: 'cart/addLine', line }),
  setQty: (id: string, quantity: number) => store.send({ type: 'cart/setQty', id, quantity }),
  inc: (id: string, by = 1) => store.send({ type: 'cart/increment', id, by }),
  dec: (id: string, by = 1) => store.send({ type: 'cart/decrement', id, by }),
  remove: (id: string) => store.send({ type: 'cart/removeLine', id }),
  clear: () => store.send({ type: 'cart/clear' }),
};

export type CartStore = typeof store;
function createCartStore() { return store; }
export default createCartStore;
