'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { addLinesToCart, updateLinesInCart, removeLinesFromCart, cartCreate, getCartById } from '@/Lib/Server/Shopify/cart';
import type { Cart } from '@/Lib/Server/Generated/hooks';

export type CartActionResult =
  | { ok: true; cart: Cart; message?: string }
  | { ok: false; error: string; cart?: Cart | null };

const CART_TAG = 'cart';
const schemaAdd = z.object({ variantId: z.string().min(1), quantity: z.number().int().min(1) });
const schemaUpdate = z.object({ lineId: z.string().min(1), quantity: z.number().int().min(0) });
const schemaRemove = z.object({ lineId: z.string().min(1) });

async function readCookieCartId() {
  const store = await cookies(); // Next 15: async cookies API :contentReference[oaicite:3]{index=3}
  return store.get('cartId')?.value;
}
async function writeCookieCartId(id: string) {
  (await cookies()).set('cartId', id, { httpOnly: true, path: '/' });
}

export async function addLines(
  _prev: CartActionResult,
  input: z.infer<typeof schemaAdd>
): Promise<CartActionResult> {
  const v = schemaAdd.safeParse(input);
  if (!v.success) return { ok: false, error: v.error.message };

  const existingId = await readCookieCartId();

  const cart = existingId
    ? await addLinesToCart(existingId, [{ merchandiseId: v.data.variantId, quantity: v.data.quantity }])
    : await cartCreate([{ merchandiseId: v.data.variantId, quantity: v.data.quantity }]);

  if (!cart?.id) return { ok: false, error: 'Cart not returned from API' };

  await writeCookieCartId(cart.id);
  revalidateTag(CART_TAG); // invalidér alle fetch-kall tagget med 'cart' :contentReference[oaicite:4]{index=4}
  return { ok: true, cart, message: 'Added' };
}

export async function updateLines(
  _prev: CartActionResult,
  input: z.infer<typeof schemaUpdate>
): Promise<CartActionResult> {
  const v = schemaUpdate.safeParse(input);
  if (!v.success) return { ok: false, error: v.error.message };

  const cartId = await readCookieCartId();
  if (!cartId) return { ok: false, error: 'No cart' };

  const cart = await updateLinesInCart(cartId, [{ id: v.data.lineId, quantity: v.data.quantity }]);
  revalidateTag(CART_TAG);
  return { ok: true, cart, message: 'Updated' };
}

export async function removeLines(
  _prev: CartActionResult,
  input: z.infer<typeof schemaRemove>
): Promise<CartActionResult> {
  const v = schemaRemove.safeParse(input);
  if (!v.success) return { ok: false, error: v.error.message };

  const cartId = await readCookieCartId();
  if (!cartId) return { ok: false, error: 'No cart' };

  const cart = await removeLinesFromCart(cartId, [v.data.lineId]);
  revalidateTag(CART_TAG);
  return { ok: true, cart, message: 'Removed' };
}

// Clear: fjern alle linjer, eller dropp eksisterende og lag ny cart
export async function clearCart(_prev: CartActionResult): Promise<CartActionResult> {
  const cartId = await readCookieCartId();
  if (!cartId) return { ok: true, cart: (await cartCreate([])) };

  const current = await getCartById(cartId);
  const lineIds = current?.lines?.edges?.map(e => e.node.id) ?? [];
  const cart = lineIds.length ? await removeLinesFromCart(cartId, lineIds) : current;
  revalidateTag(CART_TAG);
  return { ok: true, cart };
}

// Begin checkout: returnér checkoutUrl for redirect
export async function beginCheckout(_prev: CartActionResult): Promise<CartActionResult> {
  const cartId = await readCookieCartId();
  if (!cartId) return { ok: false, error: 'No cart' };

  const cart = await getCartById(cartId);
  if (!cart?.checkoutUrl) return { ok: false, error: 'Missing checkoutUrl', cart: cart ?? null };

  // ikke nødvendig å revalidate her, men ufarlig om du vil holde UI i sync
  revalidateTag(CART_TAG);
  return { ok: true, cart };
}
