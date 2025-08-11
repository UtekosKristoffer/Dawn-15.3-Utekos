import { unstable_cache } from 'next/cache';
import { shopifyRequest } from '@/Lib/Server/Fetches/Fetcher';

const GET_CART = /* GraphQL */ `query($id: ID!) { cart(id: $id) { id totalQuantity checkoutUrl } }`;

export const getCartCached = unstable_cache(
  async (cartId: string) => {
    return shopifyRequest<{ cart: { id: string; totalQuantity: number; checkoutUrl: string } | null }>(
      GET_CART,
      { id: cartId }
    );
  },
  ['cart-read'], // cache‑key parts
  { tags: ['cart'] } // gjør on‑demand revalidering mulig
); // :contentReference[oaicite:17]{index=17}
