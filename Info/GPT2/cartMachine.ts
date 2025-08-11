// src/state/cart.machine.ts
import { createMachine } from 'xstate';
import type { Cart } from '@/Lib/Server/Generated/hooks';

export type Ctx = { cart: Cart | null; error: string | null };
type Ev =
  | { type: 'ADD' ; variantId: string; quantity: number }
  | { type: 'UPDATE'; lineId: string; quantity: number }
  | { type: 'REMOVE'; lineId: string }
  | { type: 'CLEAR' }
  | { type: 'CHECKOUT' }
  | { type: 'RESOLVE'; cart: Cart }
  | { type: 'REJECT'; error: string };

export const cartMachine = createMachine({
  id: 'cart',
  initial: 'idle',
  context: { cart: null, error: null } as Ctx, // xstate-initial-state
  states: {
    idle: { on: { ADD: 'mutating', UPDATE: 'mutating', REMOVE: 'mutating', CLEAR: 'mutating', CHECKOUT: 'checkingOut' } },
    mutating: { on: { RESOLVE: { target: 'idle', actions: ['assignCart'] }, REJECT: { target: 'error', actions: ['assignError'] } } },
    checkingOut: { on: { RESOLVE: { target: 'idle', actions: ['assignCart'] }, REJECT: { target: 'error', actions: ['assignError'] } } },
    error: { on: { ADD: 'mutating', UPDATE: 'mutating', REMOVE: 'mutating', CLEAR: 'mutating' } },
  },
});
export default cartMachine;
