// src/state/cart.ui.store.ts
import { createStore } from '@xstate/store';

export type CartUiState = {
  open: boolean;
  pending: boolean;
  lastOp: null | 'add' | 'update' | 'remove' | 'clear' | 'checkout';
  error: string | null;
};

const initial: CartUiState = { open: false, pending: false, lastOp: null, error: null };
export const cartUiStore = createStore(initial, {
  openDrawer: (s) => ({ ...s, open: true }),
  closeDrawer: (s) => ({ ...s, open: false }),
  start: (s, op: NonNullable<CartUiState['lastOp']>) => ({ ...s, pending: true, lastOp: op, error: null }),
  success: (s) => ({ ...s, pending: false }),
  fail: (s, error: string) => ({ ...s, pending: false, error }),
});
export default cartUiStore;
