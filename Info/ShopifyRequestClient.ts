// Fil: src/Lib/Server/Shopify/shopifyRequest.ts

import StoreFrontApiClient from "@/Lib/Clients/StoreFrontApiClient"; //
import { headers } from "next/headers";

export class ShopifyRequestError extends Error {
  constructor(
    message: string,
    public details?: {
      status?: number;
      errors?: any[];
    }
  ) {
    super(message);
    this.name = "ShopifyRequestError";
  }
}

type RequestOptions = {
  buyerIp?: string | null | undefined;
  retries?: number; // default 2
  extraHeaders?: Record<string, string>;
};

/**
 * En sentralisert og robust funksjon for å sende GraphQL-forespørsler
 * til Shopify Storefront API fra server-miljøet.
 *
 * @param query GraphQL-operasjonen (query eller mutation) som en streng.
 * @param variables Et objekt med variabler for operasjonen.
 * @param opts Valgfrie innstillinger som antall retries.
 * @returns Den typesikre `data`-delen av GraphQL-responsen.
 * @throws {ShopifyRequestError} hvis nettverkskallet eller GraphQL-operasjonen feiler.
 */
export async function ShopifyRequestClient<
  TResult,
  TVariables extends Record<string, any>,
>(
  query: string,
  variables?: TVariables,
  opts: RequestOptions = {}
): Promise<TResult> {
  const h = headers();
  const buyerIp =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip");

  const response = await StoreFrontApiClient.request<TResult>(query, {
    variables,
    headers: buyerIp ? { "Shopify-Storefront-Buyer-IP": buyerIp } : {},
    retries: opts.retries ?? 2,
  });

  if (response.errors) {
    const errorMessages = Array.isArray(response.errors)
      ? response.errors.map((e: any) => e.message).join("\n")
      : JSON.stringify(response.errors);

    throw new ShopifyRequestError(
      `GraphQL-feil fra Shopify: ${errorMessages}`,
      {
        errors: Array.isArray(response.errors)
          ? response.errors
          : [response.errors],
      }
    );
  }

  if (!response.data) {
    throw new ShopifyRequestError("Mottok ingen data fra Shopify API-et.");
  }

  // Returner kun den rene dataen ved suksess.
  return response.data;
}
