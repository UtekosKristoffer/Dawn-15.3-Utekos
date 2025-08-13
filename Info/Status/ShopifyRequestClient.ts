// Fil: src/Lib/Clients/StoreFrontApiClient.ts
import StoreFrontApiClient from "@/Lib/Clients/StoreFrontApiClient";
import type { ApiClientRequestOptions } from "@shopify/graphql-client";
import { GraphqlQueryError } from "@shopify/shopify-api";
import { headers } from "next/headers";

export function ShopifyRequestClient<
  TResult,
  TVariables extends Record<string, any>,
>(query: string, variables?: TVariables) {
  return async (): Promise<TResult> => {
    const requestHeaders = await headers();
    const buyerIp =
      requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      requestHeaders.get("x-real-ip") ??
      undefined;

    const OPTIONS: ApiClientRequestOptions = {
      variables: variables,
      retries: 2,
      headers: {
        ...(buyerIp ? { "Shopify-Storefront-Buyer-IP": buyerIp } : {}),
      },
    };

    const response = await StoreFrontApiClient.request<TResult>(query, OPTIONS);

    if (response.errors) {
      throw new GraphqlQueryError({
        message:
          response.errors.message ?? "An unknown GraphQL error occurred.",
        response: response as Record<string, unknown>,
        body: response.errors.graphQLErrors as Record<string, any>,
      });
    }

    if (!response.data) {
      throw new Error("Mottok ingen data fra Shopify API-et.");
    }

    return response.data;
  };
}
