"use server";

import "server-only";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import type { Cart } from "@/GraphQL/schema";
import { CartCreateDocument, type CartCreateMutation, type CartCreateMutationVariables, CartLinesAddDocument, type CartLinesAddMutation, type CartLinesAddMutationVariables, CartLinesUpdateDocument, type CartLinesUpdateMutation, type CartLinesUpdateMutationVariables, CartLinesRemoveDocument, type CartLinesRemoveMutation, type CartLinesRemoveMutationVariables, CartClearDocument, type CartClearMutation, type CartClearMutationVariables } from "@/GraphQL/Mutations/CartMutations.generated";
import { ShopifyRequestClient } from "@/Lib/Clients/ShopifyRequestClient";

type Result = {
  success: boolean;
  message: string;
  cart?: Cart | null;
  error?: string | null;
};

type AddLinesInput = { merchandiseId: string; quantity: number };
type UpdateLineInput = { lineId: string; quantity: number };
type RemoveLineInput = { lineId: string };

async function ensureCartId(): Promise<string> {
  const cookieStore = await cookies();
  let id = cookieStore.get("cartId")?.value;

  if (!id) {
    const run = ShopifyRequestClient<CartCreateMutation, CartCreateMutationVariables>(CartCreateDocument, {
      input: {} as CartCreateMutationVariables["input"],
    });

    const data = await run();
    id = data.cartCreate?.cart?.id ?? "";
    if (!id) throw new Error("CartCreate returned no id");

    cookieStore.set({
      name: "cartId",
      value: id,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    }); // korrekt signatur i Next 15 cookies API
  }

  return id;
}

/** Generisk mutasjon som normaliserer til Cart via selector */
async function mutateCart<TData, TVars extends Record<string, any>>(doc: any, vars: TVars, pickCart: (data: NonNullable<TData>) => Cart | null): Promise<Cart | null> {
  const run = ShopifyRequestClient<TData, TVars>(doc, vars);
  const data = (await run()) as NonNullable<TData>;
  revalidateTag("cart"); // ISR via tag
  return pickCart(data);
}

export async function addLines(input: { merchandiseId: string; quantity: number }): Promise<Result> {
  try {
    const cartId = await ensureCartId();
    const cart = await mutateCart<CartLinesAddMutation, CartLinesAddMutationVariables>(
      CartLinesAddDocument,
      {
        cartId,
        lines: [{ merchandiseId: input.merchandiseId, quantity: input.quantity }],
      },
      d => d.cartLinesAdd?.cart ?? null
    );
    return { success: true, message: "OK", cart };
  } catch (e: any) {
    return {
      success: false,
      message: e?.message ?? "Feil",
      error: e?.message ?? "Feil",
    };
  }
}

export async function updateLine(input: { lineId: string; quantity: number }): Promise<Result> {
  try {
    const cartId = await ensureCartId();
    const cart = await mutateCart<CartLinesUpdateMutation, CartLinesUpdateMutationVariables>(CartLinesUpdateDocument, { cartId, lines: [{ id: input.lineId, quantity: input.quantity }] }, d => d.cartLinesUpdate?.cart ?? null);
    return { success: true, message: "OK", cart };
  } catch (e: any) {
    return {
      success: false,
      message: e?.message ?? "Feil",
      error: e?.message ?? "Feil",
    };
  }
}

export async function removeLine(input: { lineId: string }): Promise<Result> {
  try {
    const cartId = await ensureCartId();
    const cart = await mutateCart<CartLinesRemoveMutation, CartLinesRemoveMutationVariables>(
      CartLinesRemoveDocument,
      { cartId, lineIds: [input.lineId] }, // lineIds er påkrevd
      d => d.cartLinesRemove?.cart ?? null
    );
    return { success: true, message: "OK", cart };
  } catch (e: any) {
    return {
      success: false,
      message: e?.message ?? "Feil",
      error: e?.message ?? "Feil",
    };
  }
}

export async function clear(): Promise<Result> {
  try {
    const cartId = await ensureCartId();
    const cart = await mutateCart<CartClearMutation, CartClearMutationVariables>(CartClearDocument, { cartId }, d => d.cartClear?.cart ?? null);
    return { success: true, message: "OK", cart };
  } catch (e: any) {
    return {
      success: false,
      message: e?.message ?? "Feil",
      error: e?.message ?? "Feil",
    };
  }
}

export async function ADD_LINES(_prev: Result, form: FormData | AddLinesInput): Promise<Result> {
  const input =
    form instanceof FormData
      ? {
          merchandiseId: String(form.get("variantId") ?? ""),
          quantity: Number(form.get("quantity") ?? 1),
        }
      : form;
  if (!input.merchandiseId) return { success: false, message: "variantId mangler" };
  return addLines(input);
}

export async function UPDATE_LINE(_prev: Result, form: FormData | UpdateLineInput): Promise<Result> {
  const input =
    form instanceof FormData
      ? {
          lineId: String(form.get("lineId") ?? ""),
          quantity: Number(form.get("quantity") ?? 0),
        }
      : form;
  if (!input.lineId) return { success: false, message: "lineId mangler" };
  return updateLine(input);
}

export async function REMOVE_LINE(_prev: Result, form: FormData | RemoveLineInput): Promise<Result> {
  const input = form instanceof FormData ? { lineId: String(form.get("lineId") ?? "") } : form;
  if (!input.lineId) return { success: false, message: "lineId mangler" };
  return removeLine(input);
}

export async function CLEAR(_prev: Result): Promise<Result> {
  return clear();
}
