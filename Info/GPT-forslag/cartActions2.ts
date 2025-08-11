'use server';

import { cookies, headers } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { shopifyRequest } from '@/Lib/Server/Fetches/Fetcher';
import type { Cart } from '@/Lib/Server/Generated/graphql'; // dine codegen-typer

type ActionResult = {
  success: boolean;
  message: string;
  cart?: Cart | null;
  checkoutUrl?: string;
  error?: string | null;
};

const Input = z.object({
  variantId: z.string().min(1),
  quantity: z.number().int().min(1),
});

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartMini on Cart {
    id
    totalQuantity
    checkoutUrl
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise { ... on ProductVariant { id title } }
        }
      }
    }
  }
`;

const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ...CartMini }
      userErrors { message }
    }
  }
  ${CART_FRAGMENT}
`;

const CART_LINES_ADD = /* GraphQL */ `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartMini }
      userErrors { message }
      warnings { message }
    }
  }
  ${CART_FRAGMENT}
`;

export default async function addLines(
  _prev: unknown,
  raw: unknown
): Promise<ActionResult> {
  const parsed = Input.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: 'Ugyldig input', error: parsed.error.message };
  }
  const { variantId, quantity } = parsed.data;

  const cookieStore = await cookies();
  const cartId = cookieStore.get('cartId')?.value ?? null;

  // Buyer IP for riktig kapasitet/beskyttelse
  const ip =
    (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ??
    (await headers()).get('x-real-ip') ??
    undefined;

  try {
    let data: { cart: Cart | null; userErrors?: { message: string }[] } | null;

    if (cartId) {
      const res = await shopifyRequest<{
        cartLinesAdd: { cart: Cart | null; userErrors: { message: string }[] };
      }>(CART_LINES_ADD, { cartId, lines: [{ merchandiseId: variantId, quantity }] }, { buyerIp: ip });
      data = { cart: res.cartLinesAdd.cart, userErrors: res.cartLinesAdd.userErrors };
    } else {
      const res = await shopifyRequest<{
        cartCreate: { cart: Cart | null; userErrors: { message: string }[] };
      }>(CART_CREATE, { lines: [{ merchandiseId: variantId, quantity }] }, { buyerIp: ip });
      data = { cart: res.cartCreate.cart, userErrors: res.cartCreate.userErrors };
    }

    const userError = data?.userErrors?.[0]?.message;
    if (userError) return { success: false, message: userError, error: userError };

    const cart = data?.cart ?? null;
    if (!cart) return { success: false, message: 'Cart mangler', error: 'Cart null' };

    // Oppdater cookie (cartId inneholder «key» og MÅ holdes privat, sett httpOnly)
    (await cookies()).set('cartId', cart.id, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    }); // cartId+key må ikke lekke til klienten. 

    revalidateTag('cart'); // invalidér alle serverlese‑spørringer tagget med 'cart' :contentReference[oaicite:5]{index=5}
    return { success: true, message: 'Lagt til', cart };
  } catch (e: any) {
    return { success: false, message: 'Feil mot Shopify', error: e?.message ?? 'unknown' };
  }
}
