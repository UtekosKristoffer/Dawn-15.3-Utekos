// src/Lib/Server/Shopify/shopify-fetcher.ts
import StoreFrontApiClient from '@/Lib/Clients/StoreFrontApiClient';
import { headers } from 'next/headers';

export class ShopifyRequestError extends Error {
  constructor(message: string, public details?: { status?: number; errors?: any[] }) {
    super(message);
    this.name = 'ShopifyRequestError';
  }
}

export type RequestOptions = {
  buyerIp?: string | null;
  retries?: number;           // default 2
  extraHeaders?: Record<string, string>;
};

function mergeHeaders(buyerIp?: string | null, extra?: Record<string, string>) {
  const h: Record<string, string> = {};
  if (buyerIp) h['Shopify-Storefront-Buyer-IP'] = buyerIp;
  return { ...h, ...extra };
}

/** Direkte Promise for Server Actions */
export async function shopifyRequest<
  TData,
  TVariables extends Record<string, unknown> = Record<string, never>
>(query: string, variables?: TVariables, opts: RequestOptions = {}): Promise<TData> {
  const hdrs = await headers();
  const ip =
    opts.buyerIp ??
    hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    hdrs.get('x-real-ip') ??
    undefined;

  const { data, errors } = await StoreFrontApiClient.request<TData>(query, {
    variables,
    retries: opts.retries ?? 2,
    headers: mergeHeaders(ip, opts.extraHeaders),
  });

  if (errors?.length) {
    throw new ShopifyRequestError(
      errors.map((e: any) => e?.message ?? 'Unknown error').join('\n'),
      { errors }
    );
  }
  if (!data) throw new ShopifyRequestError('Missing data from Storefront API');
  return data;
}

/** Thunk‑fetcher for GraphQL Code Generator (React Query plugin) */
export function codegenFetcher<
  TData,
  TVariables extends Record<string, unknown> = Record<string, never>
>(query: string, variables?: TVariables, opts?: RequestOptions) {
  return async () => shopifyRequest<TData, TVariables>(query, variables, opts);
}
