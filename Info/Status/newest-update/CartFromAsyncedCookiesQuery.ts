// src/ServerFunctions/Cart/CartFromAsyncedCookiesQuery.ts

"use server";

import "server-only";

import { GetCartDocument, type GetCartQuery, type GetCartQueryVariables } from "@/GraphQL/Queries/GetCart.generated";
import { unstable_cache } from "next/cache";

import queryShopify from "@/Lib/Clients/shopifyQuery";

export const CART_FROM_ASYNCED_COOKIESQUERY = unstable_cache(
  async (cartId: string) => {
    const data = await queryShopify<GetCartQuery, GetCartQueryVariables>(GetCartDocument, { cartId });
    return data.cart ?? null;
  },
  ["cart"],
  { tags: ["cart"] }
);

export default CART_FROM_ASYNCED_COOKIESQUERY;
