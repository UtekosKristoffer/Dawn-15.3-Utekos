"use server";

import LineItem from "@/Actions/Cart/Interfaces/LineItem";
import createCartWithItem from "@/Lib/Server/Mutations/createCartWithLines";
import addItemToExistingCart from "@/Actions/Cart/addItemToExistingCart";

async function addItemToCart(
  cartId: string | undefined,
  variantId: string,
  quantity: number = 1
): Promise<Cart> {
  const lineItem: LineItem = { merchandiseId: variantId, quantity };

  if (cartId) {
    return addItemToExistingCart(cartId, lineItem);
  } else {
    return createCartWithItem(lineItem);
  }
}

export default addItemToCart;
