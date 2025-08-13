import type { CompleteCartFragment as Cart } from "@/GraphQL/Fragments/CartFragment.generated";
declare global {
  type CART_ACTION_RESULT = {
    success: boolean;
    message: string;
    cart?: Cart | null;
    error?: string | null;
  };

  class ShopifyFetchError extends Error {
    constructor(message: string);
  }
}
export {};
