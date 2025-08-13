import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { CartLinesRemoveDocument } from "@/GraphQL/Mutations/CartMutations.generated";
import GET_CART_ON_SERVER from "./getCartOnServer";
import {
  CartLinesRemoveMutation,
  CartLinesRemoveMutationVariables,
} from "@/GraphQL/Mutations/CartMutations.generated";

import { ShopifyRequestClient } from "@/Lib/Clients/ShopifyRequestClient";

async function CLEAR_CART(
  _prevState: CART_ACTION_RESULT
): Promise<CART_ACTION_RESULT> {
  try {
    const cartId = (await cookies()).get("cartId")?.value;
    if (!cartId) {
      return {
        success: true,
        cart: null,
        message: "Handlekurv var allerede tom.",
      };
    }

    const currentCart = await GET_CART_ON_SERVER(cartId);
    const lineIds = currentCart?.lines.edges.map((edge) => edge.node.id) ?? [];

    if (lineIds.length === 0) {
      return {
        success: true,
        cart: currentCart,
        message: "Handlekurv var allerede tom.",
      };
    }

    const { cartLinesRemove } = await ShopifyRequestClient<
      CartLinesRemoveMutation,
      CartLinesRemoveMutationVariables
    >(CartLinesRemoveDocument, { cartId, lineIds })();

    if (cartLinesRemove?.userErrors?.length) {
      throw new Error(cartLinesRemove.userErrors[0].message);
    }

    if (!cartLinesRemove?.cart) {
      throw new Error("Handlekurven ble ikke returnert etter tømming.");
    }

    revalidateTag("cart");
    return {
      success: true,
      cart: cartLinesRemove.cart,
      message: "Handlekurv tømt.",
    };
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "En ukjent feil oppstod.";
    return {
      success: false,
      error,
      message: "Feil ved tømming av handlekurv.",
    };
  }
}

export default CLEAR_CART;
