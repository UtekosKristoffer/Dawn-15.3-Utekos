"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

// Importer våre lavnivå Shopify-funksjoner
import { cartCreate, addLinesToCart, removeLinesFromCart, updateLinesInCart } from "@/Lib/Server/Shopify/cart";
import type { Cart } from "@/Lib/Server/Generated/hooks";

// Definer en standard retur-type for alle actions
type ActionResult = {
  success: boolean;
  message: string;
  data?: Cart | null;
  error?: string | null;
};

// --- Add Item Action ---
// Den aksepterer nå primitive typer, ikke FormData
export async function addItemAction(
  prevState: any, // For useActionState
  { variantId, quantity }: { variantId: string; quantity: number }
): Promise<ActionResult> {
  // 1. Valider input på serveren (alltid en god praksis, selv med Zod på klienten)
  const schema = z.object({
    variantId: z.string().min(1),
    quantity: z.number().min(1),
  });
  const validation = schema.safeParse({ variantId, quantity });
  if (!validation.success) {
    return { success: false, message: "Ugyldig input.", error: validation.error.message };
  }

  // 2. Håndter cartId via cookies
  const cartId = cookies().get("cartId")?.value;

  try {
    let cart;
    if (cartId) {
      cart = await addLinesToCart(cartId, [{ merchandiseId: variantId, quantity }]);
    } else {
      cart = await cartCreate([{ merchandiseId: variantId, quantity }]);
    }

    if (!cart) throw new Error("Kunne ikke hente handlekurv etter operasjon.");

    cookies().set("cartId", cart.id);
    revalidateTag("cart"); // Invalider server-cachen

    return { success: true, message: "Vare lagt til.", data: cart };
  } catch (e: any) {
    return { success: false, message: "En feil oppstod.", error: e.message };
  }
}

// --- Update Quantity Action ---
export async function updateQuantityAction(
  prevState: any,
  { lineId, quantity }: { lineId: string; quantity: number }
): Promise<ActionResult> {
  const cartId = cookies().get("cartId")?.value;
  if (!cartId) return { success: false, message: "Ingen handlekurv funnet." };

  // Server-side validering
  // ...

  try {
    const cart = await updateLinesInCart(cartId, [{ id: lineId, quantity }]);
    revalidateTag("cart");
    return { success: true, message: "Antall oppdatert.", data: cart };
  } catch (e: any) {
    return { success: false, message: "Feil ved oppdatering.", error: e.message };
  }
}

// --- Remove Line Action ---
export async function removeLineAction(
  prevState: any,
  { lineId }: { lineId: string }
): Promise<ActionResult> {
  const cartId = cookies().get("cartId")?.value;
  if (!cartId) return { success: false, message: "Ingen handlekurv funnet." };

  try {
    const cart = await removeLinesFromCart(cartId, [lineId]);
    revalidateTag("cart");
    return { success: true, message: "Vare fjernet.", data: cart };
  } catch (e: any) {
    return { success: false, message: "Feil ved fjerning.", error: e.message };
  }
}
