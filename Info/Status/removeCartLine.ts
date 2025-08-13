// fil: src/DAL/cart/removeCartLine.ts
"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { ShopifyRequestClient } from "@/Lib/Clients/ShopifyRequestClient";
import { CartLinesRemoveDocument as CartLinesRemove } from "@/GraphQL/Mutations/CartMutations.generated";
import type {
  CartLinesRemoveMutation,
  CartLinesRemoveMutationVariables,
} from "@/GraphQL/Mutations/CartMutations.generated";

const removeLineSchema = z.object({
  lineId: z.string().min(1, "Mangler linje-ID for fjerning."),
});

async function REMOVE_CART_LINE(
  _prevState: CART_ACTION_RESULT,
  payload: { lineId: string }
): Promise<CART_ACTION_RESULT> {
  const validationResult = removeLineSchema.safeParse(payload);
  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.message,
      message: "Ugyldig input.",
    };
  }

  const { lineId } = validationResult.data;

  try {
    const cartId = (await cookies()).get("cartId")?.value;

    // Du kan ikke fjerne en vare hvis det ikke finnes en handlekurv
    if (!cartId) {
      throw new Error("Ingen aktiv handlekurv funnet.");
    }

    const { cartLinesRemove } = await ShopifyRequestClient<
      CartLinesRemoveMutation,
      CartLinesRemoveMutationVariables
    >(CartLinesRemove, { cartId, lineIds: [lineId] })();

    if (cartLinesRemove?.userErrors?.length) {
      throw new Error(cartLinesRemove.userErrors[0].message);
    }

    if (!cartLinesRemove?.cart) {
      throw new Error("Handlekurven ble ikke returnert etter fjerning.");
    }

    revalidateTag("cart");
    return {
      success: true,
      cart: cartLinesRemove.cart,
      message: "Vare fjernet.",
    };
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "En ukjent feil oppstod.";
    return { success: false, error, message: "Feil ved fjerning av vare." };
  }
}

export default REMOVE_CART_LINE;
