// Fil: src/ServerFunctions/Cart/CartFromCookiesAndCacheonServer.ts
"use server";

import "server-only";
import { cookies } from "next/headers";
import { CART_FROM_ASYNCED_COOKIESQUERY } from "@/ServerFunctions/Cart/CartFromAsyncedCookiesQuery";
import { NextResponse } from "next/server";
/**
 * Henter cart fra cookies og cache, og returnerer som Promise.
 */

export async function CART_FROM_COOKIES_AND_CACHE_ON_SERVER(): Promise<Awaited<ReturnType<typeof CART_FROM_ASYNCED_COOKIESQUERY>>> {
  const cartId = (await cookies()).get("cartId")?.value;
  if (!cartId) {
    return null;
  }
  let response = NextResponse.next();
  response.cookies.get("cartId")?.value;

  return CART_FROM_ASYNCED_COOKIESQUERY(cartId);
}

export default CART_FROM_ASYNCED_COOKIESQUERY;
