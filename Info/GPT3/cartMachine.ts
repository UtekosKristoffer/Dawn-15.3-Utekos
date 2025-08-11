import { createMachine } from 'xstate';

type Ctx = { lastError?: string|null; pending?: 'add'|'update'|'remove'|'clear'|'checkout'|null };
type Ev =
  | { type: 'ADD'; input: { variantId: string; quantity: number } }
  | { type: 'UPDATE'; input: { lineId: string; quantity: number } }
  | { type: 'REMOVE'; input: { lineId: string } }
  | { type: 'CLEAR' }
  | { type: 'BEGIN_CHECKOUT' }
  | { type: 'DONE' }
  | { type: 'FAIL'; error: string };

export const cartMachine = createMachine<Ctx, Ev>({
  id: 'cart',
  initial: 'idle',
  context: { lastError: null, pending: null },
  states: {
    idle: {
      on: {
        ADD: { target: 'mutating', actions: ({ context, event }) => (context.pending = 'add') },
        UPDATE: { target: 'mutating', actions: ({ context }) => (context.pending = 'update') },
        REMOVE: { target: 'mutating', actions: ({ context }) => (context.pending = 'remove') },
        CLEAR: { target: 'mutating', actions: ({ context }) => (context.pending = 'clear') },
        BEGIN_CHECKOUT: { target: 'redirecting', actions: ({ context }) => (context.pending = 'checkout') },
      },
    },
    mutating: {
      on: {
        DONE: { target: 'idle', actions: ({ context }) => (context.pending = null) },
        FAIL: { target: 'failed', actions: ({ context, event }) => (context.lastError = event.error) },
      },
    },
    redirecting: { on: { DONE: { target: 'idle' }, FAIL: { target: 'failed' } } },
    failed: { on: { ADD: 'mutating', UPDATE: 'mutating', REMOVE: 'mutating', CLEAR: 'mutating' } },
  },
});
