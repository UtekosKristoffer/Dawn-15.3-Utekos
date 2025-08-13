// Fil: src/Lib/Clients/StoreFrontApiClient.ts
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import type { StorefrontApiClient } from "@shopify/storefront-api-client";

const StoreFrontApiClient: StorefrontApiClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: process.env.SHOPIFY_STOREFRONT_API_VERSION!,
  privateAccessToken: process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN!,
  retries: 2,
});

export default StoreFrontApiClient;
