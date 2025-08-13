// Fil: src/DAL/Cart/updateLines.ts
"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { CartLinesUpdateDocument } from "@/GraphQL/Mutations/CartMutations.generated";
import {
  CartLinesUpdateMutation,
  CartLinesUpdateMutationVariables,
} from "@/GraphQL/Mutations/CartMutations.generated";

import REMOVE_CART_LINE from "./removeCartLine";
import { ShopifyRequestClient } from "@/Lib/Clients/ShopifyRequestClient";

const UPDATE_LINES_SCHEMA = z.object({
  lineId: z.string().min(1, "Mangler linje-ID."),
  quantity: z.number().int().min(0, "Antall kan ikke være negativt."),
});

async function UPDATE_LINES(
  _prevState: CART_ACTION_RESULT,
  payload: { lineId: string; quantity: number }
): Promise<CART_ACTION_RESULT> {
  const validationResult = UPDATE_LINES_SCHEMA.safeParse(payload);
  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.message,
      message: "Ugyldig input.",
    };
  }

  if (validationResult.data.quantity === 0) {
    return REMOVE_CART_LINE(_prevState, {
      lineId: validationResult.data.lineId,
    });
  }

  const { lineId, quantity } = validationResult.data;

  try {
    const cartId = (await cookies()).get("cartId")?.value;
    if (!cartId) throw new Error("Ingen aktiv handlekurv funnet.");

    const { cartLinesUpdate } = await ShopifyRequestClient<
      CartLinesUpdateMutation,
      CartLinesUpdateMutationVariables
    >(CartLinesUpdateDocument, { cartId, lines: [{ id: lineId, quantity }] })();

    if (cartLinesUpdate?.userErrors?.length) {
      throw new Error(cartLinesUpdate.userErrors[0].message);
    }

    if (!cartLinesUpdate?.cart) {
      throw new Error("Handlekurven ble ikke returnert etter oppdatering.");
    }

    revalidateTag("cart");
    return {
      success: true,
      cart: cartLinesUpdate.cart,
      message: "Antall oppdatert.",
    };
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "ERROR.";
    return {
      success: false,
      error,
      message: "Feil ved oppdatering av antall.",
    };
  }
}

export default UPDATE_LINES;
