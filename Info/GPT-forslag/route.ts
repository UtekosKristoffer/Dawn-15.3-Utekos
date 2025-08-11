// src/app/api/cart/route.ts
import { NextResponse } from 'next/server';
import { getCartById } from '@/Lib/Server/Shopify/cart';

export async function GET() {
  const cartId = (await (await import('next/headers')).cookies()).get('cartId')?.value; // async cookies :contentReference[oaicite:17]{index=17}
  const cart = cartId ? await getCartById(cartId) : null;
  return NextResponse.json({ cart });
}


//Eksempel på Sercer Component som henter med tag:
const res = await fetch('/api/cart', { next: { tags: ['cart'] } }); // knytter cache til 'cart' :contentReference[oaicite:18]{index=18}
const { cart } = await res.json();
