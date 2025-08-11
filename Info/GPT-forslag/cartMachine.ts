// src/Lib/Cart/cartMachine.ts
import { setup, fromPromise, fromCallback, type DoneActorEvent } from 'xstate';
import type { CartLine } from '@/Types/types';
import type { CartStore } from '@/Lib/Stores/cartStore';

type Tags = 'visible' | 'busy';

type Events =
  | { type: 'OPEN' } | { type: 'CLOSE' } | { type: 'TOGGLE' }
  | { type: 'ADD_LINE'; line: CartLine }
  | { type: 'REMOVE_LINE'; id: string }
  | { type: 'INCREMENT'; id: string; by?: number }
  | { type: 'DECREMENT'; id: string; by?: number }
  | { type: 'CLEAR' }
  | { type: 'BEGIN_CHECKOUT' }
  | { type: 'internal.cart.becameEmpty' }
  | { type: 'internal.cart.becameNonEmpty' }
  | DoneActorEvent<string, 'checkoutActor'>;

type Input = {
  cartStore: CartStore;
  openOnAdd?: boolean;
  createCheckout: (lines: CartLine[]) => Promise<string>;
};
type Ctx = Input;

const logic = setup({
  types: { tags: {} as Tags, input: {} as Input, events: {} as Events, context: {} as Ctx },

  actions: {
    addLine: ({ context, event }) => {
      if (event.type !== 'ADD_LINE') return;
      context.cartStore.send({ type: 'addLine', line: event.line });
    },
    removeLine: ({ context, event }) => {
      if (event.type !== 'REMOVE_LINE') return;
      context.cartStore.send({ type: 'removeLine', id: event.id });
    },
    increment: ({ context, event }) => {
      if (event.type !== 'INCREMENT') return;
      context.cartStore.send({ type: 'incrementLine', id: event.id, by: event.by });
    },
    decrement: ({ context, event }) => {
      if (event.type !== 'DECREMENT') return;
      context.cartStore.send({ type: 'decrementLine', id: event.id, by: event.by });
    },
    clear: ({ context }) => {
      context.cartStore.send({ type: 'clearCart' });
    },
    redirectToCheckout: ({ event }) => {
      if (event.type === 'xstate.done.actor.checkoutActor' && typeof window !== 'undefined') {
        window.location.href = event.output;
      }
    },
  },

  guards: {
    shouldOpenOnAdd: ({ context }) => !!context.openOnAdd,
    hasItems: ({ context }) => context.cartStore.getSnapshot().context.lines.length > 0,
  },

  actors: {
    watchStore: fromCallback<Events, { cartStore: CartStore }>(({ input, sendBack }) => {
      const sub1 = input.cartStore.on('becameEmpty', () => sendBack({ type: 'internal.cart.becameEmpty' }));
      const sub2 = input.cartStore.on('becameNonEmpty', () => sendBack({ type: 'internal.cart.becameNonEmpty' }));
      return () => { sub1.unsubscribe(); sub2.unsubscribe(); };
    }),
    createCheckout: fromPromise(async ({ input }: { input: { createCheckout: Input['createCheckout']; lines: CartLine[] } }) => {
      if (input.lines.length === 0) throw new Error('Cannot check out with an empty cart.');
      return input.createCheckout(input.lines);
    }),
  },
}).createMachine({
  id: 'cart',
  context: ({ input }) => ({ ...input }),
  initial: 'closed',
  invoke: { src: 'watchStore', input: ({ context }) => ({ cartStore: context.cartStore }) },
  on: { 'internal.cart.becameEmpty': '.closed' },
  states: {
    closed: {
      on: {
        OPEN: 'open',
        TOGGLE: 'open',
        ADD_LINE: [{ guard: 'shouldOpenOnAdd', target: 'open', actions: 'addLine' }, { actions: 'addLine' }],
      },
    },
    open: {
      tags: 'visible',
      on: {
        CLOSE: 'closed',
        TOGGLE: 'closed',
        ADD_LINE: { actions: 'addLine' },
        REMOVE_LINE: { actions: 'removeLine' },
        INCREMENT: { actions: 'increment' },
        DECREMENT: { actions: 'decrement' },
        CLEAR: { actions: 'clear' },
        BEGIN_CHECKOUT: { target: 'checkingOut', guard: 'hasItems' },
      },
    },
    checkingOut: {
      tags: ['visible', 'busy'],
      invoke: {
        id: 'checkoutActor',
        src: 'createCheckout',
        input: ({ context }) => ({ createCheckout: context.createCheckout, lines: context.cartStore.getSnapshot().context.lines }),
        onDone: { target: 'closed', actions: 'redirectToCheckout' },
        onError: { target: 'open' },
      },
    },
  },
});

export default logic;
