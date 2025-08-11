'use server';
import { revalidateTag } from 'next/cache';
import { cookies, headers } from 'next/headers';
import { z } from 'zod';
import { shopifyRequest } from '@/Lib/Server/Fetches/Fetcher';
import type { Cart } from '@/Lib/Server/Generated/graphql';

type ActionResult = { success: boolean; message: string; cart?: Cart | null; error?: string | null };

const Input = z.object({
  lineId: z.string().min(1),
  quantity: z.number().int().min(0),
});

const MUTATION = /* GraphQL */ `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id totalQuantity checkoutUrl }
      userErrors { message }
      warnings { message }
    }
  }
`;

export default async function updateLines(_prev: unknown, raw: unknown): Promise<ActionResult> {
  const parsed = Input.safeParse(raw);
  if (!parsed.success) return { success: false, message: 'Ugyldig input', error: parsed.error.message };
  const { lineId, quantity } = parsed.data;

  const cartId = (await cookies()).get('cartId')?.value;
  if (!cartId) return { success: false, message: 'Ingen cart' };

  const ip =
    (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ??
    (await headers()).get('x-real-ip') ??
    undefined;

  const res = await shopifyRequest<{ cartLinesUpdate: { cart: Cart | null; userErrors: { message: string }[] } }>(
    MUTATION,
    { cartId, lines: [{ id: lineId, quantity }] },
    { buyerIp: ip }
  );

  const err = res.cartLinesUpdate.userErrors?.[0]?.message;
  if (err) return { success: false, message: err, error: err };

  revalidateTag('cart'); // :contentReference[oaicite:9]{index=9}
  return { success: true, message: 'Oppdatert', cart: res.cartLinesUpdate.cart };
}
