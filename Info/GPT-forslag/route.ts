// src/app/api/cart/route.ts
import { NextResponse } from 'next/server';
import { getCartById } from '@/Lib/Server/Shopify/cart';

export async function GET() {
  const cartId = (await (await import('next/headers')).cookies()).get('cartId')?.value; // async cookies :contentReference[oaicite:17]{index=17}
  const cart = cartId ? await getCartById(cartId) : null;
  return NextResponse.json({ cart });
}
