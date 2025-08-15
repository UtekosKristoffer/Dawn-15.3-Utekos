// Fil: src/ServerFunctions/Cart/CartFromCookiesAndCacheonServer.ts
"use server";
import { queryOptions } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { CART_FROM_ASYNCED_COOKIESQUERY } from "@/ServerFunctions/Cart/CartFromAsyncedCookiesQuery";

const CART_FROM_COOKIES_AND_CACHE_ON_SERVER = queryOptions({
  queryKey: ["cart"],
  queryFn: async () => {
    const cartId = (await cookies()).get("cartId")?.value;
    if (!cartId) {
      return null;
    }
    return CART_FROM_ASYNCED_COOKIESQUERY(cartId);
  },
  staleTime: 1000 * 60 * 5, // 5 minutter
});

export default CART_FROM_COOKIES_AND_CACHE_ON_SERVER;
