import { Cart } from "@/GraphQL/Mutations/GraphQL/CartMutations.generated";

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

  type Result = {
    success: boolean;
    message: string;
    cart?: Cart | null;
    error?: string | null;
  };
}

export {};
