import { createStore } from '@xstate/store';

type CartUI = { drawerOpen: boolean; lastOp?: 'add'|'update'|'remove'|'clear'|null; error?: string|null };
const initial: CartUI = { drawerOpen: false, lastOp: null, error: null };

const cartUIStore = createStore(initial, {
  open: (s) => ({ ...s, drawerOpen: true }),
  close: (s) => ({ ...s, drawerOpen: false }),
  setError: (s, error: string|null) => ({ ...s, error }),
  setLastOp: (s, lastOp: CartUI['lastOp']) => ({ ...s, lastOp }),
});

export default cartUIStore;
