// Fil: src/Lib/Clients/ShopifyRequestClient.ts
import StoreFrontApiClient from "@/Lib/Clients/StoreFrontApiClient";
import type { Variables } from "graphql-request";
import { headers } from "next/headers";

export class ShopifyFetchError extends Error {
  cause?: unknown;
  constructor(message: string, cause?: unknown) {
    super(message);
    this.cause = cause;
  }
}

type RequestOptions = {
  buyerIp?: string | null | undefined;
  retries?: number;
  extraHeaders?: Record<string, string>;
};

export async function ShopifyRequestClient<TResult>(
  query: string,
  variables?: Variables,
  options: RequestOptions = {}
): Promise<TResult> {
  const requestHeaders = await headers();

  const buyerIp =
    options.buyerIp ??
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    undefined;

  const response = await StoreFrontApiClient.request<TResult>(query, {
    variables,
    retries: options.retries ?? 2,
    headers: {
      ...(buyerIp ? { "Shopify-Storefront-Buyer-IP": buyerIp } : {}),
      ...(options.extraHeaders ?? {}),
    },
  });

  if (response.errors?.graphQLErrors?.length) {
    const combinedErrorMessage = response.errors.graphQLErrors
      .map((error: { message: string }) => error.message)
      .join("\n");
    throw new ShopifyFetchError(`GraphQL: ${combinedErrorMessage}`);
  }
  if (!response.data) {
    throw new ShopifyFetchError("Mangler data fra Shopify");
  }
  return response.data;
}
