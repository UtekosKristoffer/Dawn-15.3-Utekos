"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

// Importer vår nye, typesikre Server Action
import { addItemAction } from "@/Actions/Cart/cartActions";

import Button from "@/Components/UI/button";
import { Form, FormField, ... } from "@/Components/UI/form";

// Zod-skjema for KLIENT-side validering
const addToCartSchema = z.object({
  variantId: z.string().min(1),
  quantity: z.number().int().min(1),
});
type AddToCartFormValues = z.infer<typeof addToCartSchema>;

interface AddToCartProps {
  variantId: string;
}

function AddToCart({ variantId }: AddToCartProps) {
  const queryClient = useQueryClient();

  // 1. Bruk React 19s `useActionState` for å håndtere server-kallet
  const [state, formAction, isPending] = useActionState(addItemAction, {
    success: false,
    message: "",
    error: null,
  });

  // 2. Sett opp React Hook Form for klient-side UX
  const form = useForm<AddToCartFormValues>({
    resolver: zodResolver(addToCartSchema),
    defaultValues: { variantId, quantity: 1 },
  });

  // 3. Effekt for å håndtere resultatet fra Server Action
  useEffect(() => {
    if (state.success) {
      // Suksess!
      // Invalider TanStack Query-cachen for øyeblikkelig UI-oppdatering
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      form.reset();
      // Vis en suksess-melding til brukeren (f.eks. med en "toast")
    } else if (state.error) {
      // Serveren returnerte en feil, vis den i skjemaet
      form.setError("root", { message: state.message });
    }
  }, [state, queryClient, form]);

  // 4. `onSubmit` kaller nå `formAction` fra `useActionState`
  function onSubmit(data: AddToCartFormValues) {
    // RHF har allerede validert dataen på klienten.
    // Vi kaller Server Action-en med det typesikre objektet.
    formAction(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* ... våre FormField-komponenter ... */}
        
        {/* 5. 'isPending' fra `useActionState` deaktiverer knappen */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Legger til..." : "Legg i kurv"}
        </Button>
        
        {form.formState.errors.root && (
          <p>{form.formState.errors.root.message}</p>
        )}
      </form>
    </Form>
  );
}
