import StoreFrontApiClient from '@/Lib/Clients/StoreFrontApiClient';
import type { Variables } from 'graphql-request';
import { headers } from 'next/headers';

export class ShopifyFetchError extends Error {
  cause?: unknown;
  constructor(message: string, cause?: unknown) { super(message); this.cause = cause; }
}

type Options = {
  buyerIp?: string | null | undefined;
  retries?: number;                 // default 2
  extraHeaders?: Record<string, string>;
};

export async function shopifyRequest<TResult>(
  query: string,
  variables?: Variables,
  opts: Options = {}
): Promise<TResult> {
  const h = await headers();
  const buyerIp = opts.buyerIp ??
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    h.get('x-real-ip') ?? undefined;

  const res = await StoreFrontApiClient.request<TResult>(query, {
    variables,
    retries: opts.retries ?? 2, // @shopify/storefront-api-client har innebygde retries :contentReference[oaicite:14]{index=14}
    headers: {
      ...(buyerIp ? { 'Shopify-Storefront-Buyer-IP': buyerIp } : {}),
      ...(opts.extraHeaders ?? {}),
    },
  });

  if (res.errors?.graphQLErrors?.length) {
    const msg = res.errors.graphQLErrors.map((e: any) => e.message).join('\n');
    throw new ShopifyFetchError(`GraphQL: ${msg}`);
  }
  if (!res.data) {
    throw new ShopifyFetchError('Mangler data fra Shopify');
  }
  return res.data;
}
