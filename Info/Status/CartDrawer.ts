/**
 * @file components/Cart/CartDrawer.tsx
 * @module components/Cart/CartDrawer
 * @description
 * This file exports a client component that renders the cart drawer. It displays cart data, updates item quantities, allows removal of items, and provides a checkout link.
 * @see {@link https://example.com/docs|Cart Drawer Documentation}
 */

"use client";

import { ShoppingBagIcon, Minus, Plus, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, DrawerTrigger } from "@/components/UI/drawer";
import Button from "@/components/UI/button";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { CART_QUERY_OPTIONS } from "@/server/cartQueryOptions";
import { useCartOpen, useCartPending, cartStore } from "@/lib/state/CartModel";
import { CartProcessContext } from "@/components/Cart/CartProcessClient";
import type { GetCartQuery } from "@/GraphQL/queries/GetCart.generated";

type Cart = NonNullable<GetCartQuery["cart"]>;
type CartLine = Cart["lines"]["edges"][number]["node"];

export default function CartDrawer() {
  const open = useCartOpen();
  const pending = useCartPending() > 0;
  const processRef = CartProcessContext.useActorRef();

  // useQuery henter returtypen fra CART_QUERY_OPTIONS (Cart | null)
  const { data: cart } = useQuery(CART_QUERY_OPTIONS);
  const itemCount = cart?.totalQuantity ?? 0;
  const isCartEmpty = itemCount === 0;
  const cartLines: CartLine[] = cart?.lines.edges.map(e => e.node) ?? [];

  return (
    <Drawer open={open} onOpenChange={o => cartStore.send({ type: o ? "OPEN" : "CLOSE" })} direction="right">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Åpne handlekurv" className="relative" onClick={() => cartStore.send({ type: "OPEN" })}>
          <ShoppingBagIcon className="size-6" />
          {itemCount > 0 && <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{itemCount}</span>}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="flex h-full w-full max-w-md flex-col">
        <DrawerHeader className="border-b">
          <DrawerTitle>Handlekurv ({itemCount})</DrawerTitle>
          <DrawerDescription>{isCartEmpty ? "Din handlekurv er tom." : "Produktene du har valgt."}</DrawerDescription>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="absolute top-3 right-3">
              <X className="size-5" />
              <span className="sr-only">Lukk</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>

        {pending && <p>Oppdaterer...</p>}

        {isCartEmpty ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-muted-foreground">Du har ingen varer i handlekurven.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-4">
              {cartLines.map(line => (
                <li key={line.id} className="flex items-start gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border">
                    <Image src={line.merchandise.product.featuredImage?.url ?? "/placeholder.svg"} alt={line.merchandise.product.featuredImage?.altText ?? line.merchandise.product.title} fill sizes="80px" className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{line.merchandise.product.title}</h3>
                    <p className="text-sm text-muted-foreground">{line.merchandise.title}</p>

                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        // Ikke la kvantiteten gå under 1 og blokker under pending
                        disabled={pending || line.quantity <= 1}
                        onClick={() =>
                          processRef.send({
                            type: "UPDATE_LINE",
                            input: {
                              lineId: line.id,
                              quantity: line.quantity - 1,
                            },
                          })
                        }
                      >
                        <Minus />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{line.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={pending}
                        onClick={() =>
                          processRef.send({
                            type: "UPDATE_LINE",
                            input: {
                              lineId: line.id,
                              quantity: line.quantity + 1,
                            },
                          })
                        }
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <Button
                      variant="link"
                      onClick={() =>
                        processRef.send({
                          type: "REMOVE_LINE",
                          input: { lineId: line.id },
                        })
                      }
                    >
                      Fjern
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!isCartEmpty && cart && (
          <DrawerFooter className="border-t">
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>
                {cart.cost.subtotalAmount.amount} {cart.cost.subtotalAmount.currencyCode}
              </span>
            </div>
            <a href={cart.checkoutUrl} className={`mt-4 block w-full rounded-md bg-primary py-3 text-center text-sm font-medium text-primary-foreground ${pending ? "pointer-events-none opacity-50" : ""}`}>
              Gå til kassen
            </a>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
