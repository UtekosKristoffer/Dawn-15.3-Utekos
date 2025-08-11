// src/Lib/Server/Fetches/Fetcher.ts
import StoreFrontApiClient from "@/Lib/Clients/StoreFrontApiClient";
import { Variables } from "graphql-request";

export const Fetcher = <TResult, TVariables extends Variables>(
  query: string,
  variables?: TVariables
) => {
  return async (): Promise<TResult> => {
    const response = await StoreFrontApiClient.request<TResult>(query, {
      variables,
    });

    if (response.errors && response.errors.graphQLErrors) {
      const errorMessages = response.errors.graphQLErrors
        .map((error: any) => error.message)
        .join("\n");
      throw new ShopifyFetchError(
        `GraphQL-feil fra Shopify: \n${errorMessages}`
      );
    }

    if (!response.data) {
      throw new ShopifyFetchError(
        "Mottok ingen data eller feil fra Shopify API-et."
      );
    }

    return response.data;
  };
};
