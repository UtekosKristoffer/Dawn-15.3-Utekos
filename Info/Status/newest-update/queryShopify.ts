import StoreFrontApiClient from "@/Lib/Clients/StoreFrontApiClient";
import { GraphqlQueryError } from "@shopify/shopify-api";

export async function queryShopify<TResult, TVars extends Record<string, any>>(
  query: string,
  variables?: TVars
): Promise<TResult> {
  const res = await StoreFrontApiClient.request<TResult>(query, {
    variables,
    retries: 2,
  });
  if ((res as any).errors) {
    throw new GraphqlQueryError({
      message: (res as any).errors.message ?? "GraphQL error",
      response: res as any,
      body: (res as any).errors.graphQLErrors as Record<string, any>,
    });
  }
  if (!res.data) throw new Error("No data from Shopify");
  return res.data;
}

export default queryShopify;
