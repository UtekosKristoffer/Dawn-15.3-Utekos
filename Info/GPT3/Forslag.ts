// Fil: src/Lib/Server/ShopifyRequestClient.ts

import StoreFrontApiClient from "@/Lib/Clients/StoreFrontApiClient";
import type { ApiClientRequestOptions } from "@shopify/storefront-api-client";
import { headers } from "next/headers";

type OperationVariables = Record<string, any>;

export class ShopifyFetchError extends Error {
  cause?: unknown;
  constructor(message: string, cause?: unknown) {
    super(message);
    this.cause = cause;
  }
}

export function ShopifyRequestClient<
  TResult,
  TVariables extends OperationVariables,
>(query: string, variables?: TVariables) {
  return async (): Promise<TResult> => {
    const requestHeaders = await headers();
    const buyerIp =
      requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      requestHeaders.get("x-real-ip") ??
      undefined;

    const options: ApiClientRequestOptions = {
      variables: variables,
      retries: 2, 
      headers: {
        ...(buyerIp ? { "Shopify-Storefront-Buyer-IP": buyerIp } : {}),
      },
    };

    const response = await StoreFrontApiClient.request<TResult>(query, options);

    if (response.errors?.graphQLErrors?.length) {
      const combinedErrorMessage = response.errors.graphQLErrors
        .map((error: { message: string }) => error.message)
        .join("\n");
      throw new ShopifyFetchError(`GraphQL Error: ${combinedErrorMessage}`);
    }

    if (!response.data) {
      throw new ShopifyFetchError("Mottok ingen data fra Shopify API-et.");
    }

    return response.data;
  };
}
