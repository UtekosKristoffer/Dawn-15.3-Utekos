//shopifyCartFetch er vel egentlig ikke tenkt til bli brukt i denne refaktoreringen

import LineItem from "@/Actions/Cart/Interfaces/LineItem";
import CartFragment from "../../Lib/Server/Fragments/CartFragment";

import shopifyCartFetch from "../../Lib/Server/Fetches/shopifyCartFetch";

async function addItemToExistingCart(
  cartId: string,
  lineItem: LineItem
): Promise<Cart> {
  const query = `
    mutation addLinesToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ...CompleteCart } }
    }
    ${CartFragment}
  `;

  const res = await shopifyCartFetch<{ cartLinesAdd: { cart: Cart } }>({
    query,
    variables: { cartId, lines: [lineItem] },
  });

  return res.cartLinesAdd.cart;
}

export default addItemToExistingCart;
