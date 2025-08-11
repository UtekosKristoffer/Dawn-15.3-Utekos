// src/Lib/Cart/cartMachine.ts
import { setup, createMachine, fromPromise, fromCallback } from "xstate";
import type { CartLine } from "@/Types/types";
import type { CartStore } from "@/Lib/Stores/cartStore"; // <- viktig: typen til INSTANSEN

type Tags = "visible" | "busy";

type Ev =
  | { type: "OPEN" } | { type: "CLOSE" } | { type: "TOGGLE" }
  | { type: "ADD_LINE"; line: CartLine }
  | { type: "REMOVE_LINE"; id: string }
  | { type: "INCREMENT"; id: string; by?: number }
  | { type: "DECREMENT"; id: string; by?: number }
  | { type: "SET_QTY"; id: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "BEGIN_CHECKOUT" }
  | { type: "CART_EMPTY" } | { type: "CART_NON_EMPTY" };

type Input = {
  cartStore: CartStore;                          // <- instans, ikke fabrikk
  openOnAdd?: boolean;
  createCheckout: (lines: CartLine[]) => Promise<string>;
};

const cartMachine = setup({
  types: { input: {} as Input, events: {} as Ev, tags: {} as Tags },

  guards: {
    hasItems: ({ input }) => input.cartStore.getSnapshot().context.lines.length > 0,
  },

  actions: {
    addLine: ({ input, event }) => {
      if (event.type !== "ADD_LINE") return;
      input.cartStore.trigger.addLine({ line: event.line });
    },
    removeLine: ({ input, event }) => {
      if (event.type !== "REMOVE_LINE") return;
      input.cartStore.trigger.removeLine({ id: event.id });
    },
    inc: ({ input, event }) => {
      if (event.type !== "INCREMENT") return;
      input.cartStore.trigger.incrementLine({ id: event.id, by: event.by ?? 1 });
    },
    dec: ({ input, event }) => {
      if (event.type !== "DECREMENT") return;
      input.cartStore.trigger.decrementLine({ id: event.id, by: event.by ?? 1 });
    },
    setQty: ({ input, event }) => {
      if (event.type !== "SET_QTY") return;
      input.cartStore.trigger.setLineQuantity({ id: event.id, quantity: event.quantity });
    },
    clear: ({ input }) => input.cartStore.trigger.clearCart({}),
    redirectToCheckout: ({ event }) => {
      const url = (event as any).output as string;
      if (typeof window !== "undefined") window.location.assign(url);
    },
  },

  actors: {
    watchStore: fromCallback(({ input, sendBack }) => {
      const a = input.cartStore.on("becameEmpty", () => sendBack({ type: "CART_EMPTY" }));
      const b = input.cartStore.on("becameNonEmpty", () => sendBack({ type: "CART_NON_EMPTY" }));
      return () => { a.unsubscribe(); b.unsubscribe(); };
    }),
    createCheckout: fromPromise(async ({ input }) => {
      const lines = input.cartStore.getSnapshot().context.lines;
      return input.createCheckout(lines);
    }),
  },
}).createMachine({
  id: "cart",
  initial: "closed",
  invoke: { src: "watchStore" },
  on: { CART_EMPTY: "closed" },
  states: {
    closed: {
      on: {
        OPEN: "open",
        TOGGLE: "open",
        ADD_LINE: [
          { guard: ({ input }) => !!input.openOnAdd, target: "open", actions: "addLine" },
          { actions: "addLine" },
        ],
      },
    },
    open: {
      tags: "visible",
      on: {
        CLOSE: "closed",
        TOGGLE: "closed",
        ADD_LINE: { actions: "addLine" },
        REMOVE_LINE: { actions: "removeLine" },
        INCREMENT: { actions: "inc" },
        DECREMENT: { actions: "dec" },
        SET_QTY:   { actions: "setQty" },
        CLEAR:     { actions: "clear" },
        BEGIN_CHECKOUT: { guard: "hasItems", target: "checkout" },
      },
    },
    checkout: {
      tags: ["visible", "busy"],
      invoke: {
        src: "createCheckout",
        onDone: { target: "open", actions: "redirectToCheckout" },
        onError: { target: "open" },
      },
    },
  },
});

export default cartMachine;
