"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  CartLinesAddDocument as CartLinesAdd,
  CartCreateDocument as CartCreate,
} from "@/GraphQL/Mutations/CartMutations.generated";
import type { CompleteCartFragment as Cart } from "@/GraphQL/Fragments/CartFragment.generated";
import { ShopifyRequestClient } from "@/Lib/Clients/ShopifyRequestClient";
import type {
  CartLinesAddMutation,
  CartLinesAddMutationVariables,
  CartCreateMutation,
  CartCreateMutationVariables,
} from "@/GraphQL/Mutations/CartMutations.generated";

const addLinesSchema = z.object({
  merchandiseId: z.string().min(1, "Mangler variant-ID"),
  quantity: z.number().int().min(1, "Antall må være minst 1"),
});

async function ADD_LINES(
  _prevState: CART_ACTION_RESULT,
  payload: { merchandiseId: string; quantity: number }
): Promise<CART_ACTION_RESULT> {
  const validationResult = addLinesSchema.safeParse(payload);
  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.message,
      message: "INPUT ERROR.",
    };
  }

  const { merchandiseId, quantity } = validationResult.data;
  const lines = [{ merchandiseId, quantity }];

  try {
    const cartId = (await cookies()).get("cartId")?.value;

    if (cartId) {
      const { cartLinesAdd } = await ShopifyRequestClient<
        CartLinesAddMutation,
        CartLinesAddMutationVariables
      >(CartLinesAdd, { cartId, lines })();

      if (cartLinesAdd?.userErrors?.length) {
        throw new Error(cartLinesAdd.userErrors[0].message);
      }

      if (!cartLinesAdd?.cart) {
        throw new Error("Handlekurven ble ikke returnert etter adding.");
      }

      revalidateTag("cart");
      return {
        success: true,
        cart: cartLinesAdd.cart,
        message: "Vare lagt til.",
      };
    } else {
      const { cartCreate } = await ShopifyRequestClient<
        CartCreateMutation,
        CartCreateMutationVariables
      >(CartCreate, { input: { lines } })();

      if (cartCreate?.userErrors?.length) {
        throw new Error(cartCreate.userErrors[0].message);
      }

      const newCart = cartCreate?.cart;
      if (!newCart?.id) {
        throw new Error("Klarte ikke å opprette ny handlekurv.");
      }

      (await cookies()).set("cartId", newCart.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      revalidateTag("cart");
      return { success: true, cart: newCart, message: "Handlekurv opprettet." };
    }
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "En ukjent feil oppstod.";
    return {
      success: false,
      error,
      message: "ERROR.",
    };
  }
}

export default ADD_LINES;



// Fil: src/Lib/State/CartActorUI.ts
import { createActor } from "xstate";
import { CartMachineUI } from "./CartMachineUI";

export const CartActorUI = createActor(CartMachineUI).start();


//src/Lib/State/CartDataActor.ts

import { createActor } from "xstate";
import { CartDataMachine } from "./CartDataMachine";

export const CartDataActor = createActor(CartDataMachine);

CartDataActor.start();



// src/Lib/State/CartDataMachine.ts
import { setup, assign } from "xstate";
import type { CompleteCartFragment as Cart } from "@/GraphQL/Fragments/CartFragment.generated";

export const CartDataMachine = setup({
  types: {
    context: {} as { cart: Cart | null },
    events: {} as { type: "SYNC_CART"; cart: Cart | null },
  },
}).createMachine({
  id: "cartData",
  initial: "ready",
  context: { cart: null },
  states: {
    ready: {
      on: {
        SYNC_CART: {
          actions: assign({
            cart: ({ event }) => event.cart,
          }),
        },
      },
    },
  },
});


//helper.ts
import { fromPromise } from "xstate";

export function serverActionActor<Input>(
  fn: (_prev: CART_ACTION_RESULT, input: Input) => Promise<CART_ACTION_RESULT>,
) {
  return fromPromise<CART_ACTION_RESULT, Input>(async ({ input }) => fn(undefined as any, input));
}
