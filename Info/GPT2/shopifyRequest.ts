// src/Lib/Server/Fetches/shopifyRequest.ts
import StoreFrontApiClient from '@/Lib/Clients/StoreFrontApiClient';

export class ShopifyFetchError extends Error {
  constructor(msg: string, public details?: unknown) { super(msg); }
}

type RequestOpts = { headers?: Record<string,string|string[]>; retries?: number };

export async function shopifyRequest<T>(operation: string, variables?: Record<string, any>, opts?: RequestOpts): Promise<T> {
  const { data, errors } = await StoreFrontApiClient.request<T>(operation, {
    variables,
    headers: opts?.headers,
    retries: opts?.retries ?? 2, // per-request override. default=0, max=3 :contentReference[oaicite:15]{index=15}
  });

  // GraphQL errors
  if (errors?.graphQLErrors?.length) {
    const msg = errors.graphQLErrors.map((e: any) => e.message).join('\n');
    throw new ShopifyFetchError(msg, errors.graphQLErrors);
  }
  if (!data) throw new ShopifyFetchError('No data from Storefront API', errors);
  return data;
}
export default shopifyRequest;
