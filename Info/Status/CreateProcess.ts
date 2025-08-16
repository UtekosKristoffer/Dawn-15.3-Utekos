// src/Lib/State/CartProcess.ts
"use client";

import "client-only";
import { fromPromise, setup } from "xstate";
import { cartStore } from "./CartModel";

export type CartActions = {
  addLines(input: { merchandiseId: string; quantity: number }): Promise<CART_ACTION_RESULT>;
  updateLine(input: { lineId: string; quantity: number }): Promise<CART_ACTION_RESULT>;
  removeLine(input: { lineId: string }): Promise<CART_ACTION_RESULT>;
  clear(): Promise<CART_ACTION_RESULT>;
};

type EAdd = {
  type: "ADD_LINES";
  input: { merchandiseId: string; quantity: number };
};
type EUpdate = {
  type: "UPDATE_LINE";
  input: { lineId: string; quantity: number };
};
type ERemove = { type: "REMOVE_LINE"; input: { lineId: string } };
type EClear = { type: "CLEAR" };

export const createCartProcess = (actions: CartActions, onCartUpdated: () => void) =>
  setup({
    types: {
      context: {} as {},
      events: {} as EAdd | EUpdate | ERemove | EClear,
    },
    actors: {
      addLines: fromPromise<CART_ACTION_RESULT, EAdd["input"]>(({ input }) => actions.addLines(input)),
      updateLine: fromPromise<CART_ACTION_RESULT, EUpdate["input"]>(({ input }) => actions.updateLine(input)),
      removeLine: fromPromise<CART_ACTION_RESULT, ERemove["input"]>(({ input }) => actions.removeLine(input)),
      clear: fromPromise<CART_ACTION_RESULT>(() => actions.clear()),
    },
    actions: {
      inc: () => cartStore.send({ type: "PENDING_INC" }),
      dec: () => cartStore.send({ type: "PENDING_DEC" }),
      last: ({ event }) => {
        const any = event as EAdd | EUpdate | ERemove | EClear;
        cartStore.send({
          type: "SET_LAST",
          value: {
            type: any.type.toLowerCase() as any,
            at: Date.now(),
            payload: (any as any).input,
          },
        });
      },
      optimisticAdd: ({ event }) => {
        const e = event as EAdd;
        cartStore.send({
          type: "OPTIMISTIC_MERGE",
          delta: { [e.input.merchandiseId]: e.input.quantity },
        });
      },
      optimisticRemove: ({ event }) => {
        const e = event as ERemove;
        cartStore.send({
          type: "OPTIMISTIC_MERGE",
          delta: { [e.input.lineId]: 0 },
        });
      },
      clearOptimistic: () => cartStore.send({ type: "OPTIMISTIC_CLEAR" }),
      notifyUpdate: () => {
        cartStore.send({ type: "OPTIMISTIC_CLEAR" });
        onCartUpdated();
      },
      notifyError: ({ event }) => {
        console.error(event);
      },
    },
  }).createMachine({
    id: "cartProcess",
    initial: "idle",
    states: {
      idle: {
        on: {
          ADD_LINES: {
            target: "adding",
            actions: ["inc", "optimisticAdd", "last"],
          },
          UPDATE_LINE: { target: "updating", actions: ["inc", "last"] },
          REMOVE_LINE: {
            target: "removing",
            actions: ["inc", "optimisticRemove", "last"],
          },
          CLEAR: {
            target: "clearing",
            actions: ["inc", "clearOptimistic", "last"],
          },
        },
      },
      adding: {
        invoke: {
          src: "addLines",
          input: ({ event }) => (event as EAdd).input,
          onDone: { target: "idle", actions: ["dec", "notifyUpdate"] },
          onError: { target: "idle", actions: ["dec", "notifyError"] },
        },
      },
      updating: {
        invoke: {
          src: "updateLine",
          input: ({ event }) => (event as EUpdate).input,
          onDone: { target: "idle", actions: ["dec", "notifyUpdate"] },
          onError: { target: "idle", actions: ["dec", "notifyError"] },
        },
      },
      removing: {
        invoke: {
          src: "removeLine",
          input: ({ event }) => (event as ERemove).input,
          onDone: { target: "idle", actions: ["dec", "notifyUpdate"] },
          onError: { target: "idle", actions: ["dec", "notifyError"] },
        },
      },
      clearing: {
        invoke: {
          src: "clear",
          onDone: { target: "idle", actions: ["dec", "notifyUpdate"] },
          onError: { target: "idle", actions: ["dec", "notifyError"] },
        },
      },
    },
  });
