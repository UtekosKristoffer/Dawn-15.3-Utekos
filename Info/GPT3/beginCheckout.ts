'use server';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { shopifyRequest } from '@/Lib/Server/Fetches/Fetcher';

const GET_CART = /* GraphQL */ `
  query GetCart($id: ID!) { cart(id: $id) { id checkoutUrl } }
`;

type Result = { success: boolean; checkoutUrl?: string; message: string; error?: string };

export default async function beginCheckout(): Promise<Result> {
  const cartId = (await cookies()).get('cartId')?.value;
  if (!cartId) return { success: false, message: 'Ingen cart' };

  const res = await shopifyRequest<{ cart: { id: string; checkoutUrl: string } | null }>(GET_CART, { id: cartId });
  const url = res.cart?.checkoutUrl;
  if (!url) return { success: false, message: 'checkoutUrl mangler', error: 'No URL' };

  revalidateTag('cart'); // hvis du har gjort endringer før redirect
  return { success: true, message: 'OK', checkoutUrl: url };
}
