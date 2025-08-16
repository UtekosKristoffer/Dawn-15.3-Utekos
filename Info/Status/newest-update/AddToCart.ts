// src/components/product/AddToCart.tsx
//Please refactor


"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { CartProcessContext } from "@/Components/Cart/CartProcessClient";
import { useOptimistic } from "react";

const schema = z.object({
  variantId: z.string().min(1),
  quantity: z.number().int().min(1),
});
type FormValues = z.infer<typeof schema>;

export default function AddToCart({ variantId }: { variantId: string }) {
  const router = useRouter();
  const processRef = CartProcessContext.useActorRef();
  const { pending, data, method, action } = useFormStatus();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { variantId, quantity: 1 },
  });
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // valgfritt: optimistisk teller i UI (lokalt)
  const [_, addOpt] = useOptimistic(0, (c, by: number) => c + by);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async FormValues => {
    await sleep(2000);
    if (data.username === "bill") {
      alert(JSON.stringify(data));
    } else {
      alert("There is an error");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...form.register("variantId", { value: variantId })} />
      <div className="flex items-start gap-4">
        <input type="number" min={1} {...form.register("quantity", { valueAsNumber: true })} className="w-20 rounded border px-2 py-1" />
        <button type="submit" disabled={isPending} className="flex-1 rounded bg-primary px-4 py-2 text-primary-foreground">
          {isPending ? "Legger til…" : "Legg i kurv"}
        </button>
      </div>
      {form.formState.errors.root?.message && <p className="mt-2 text-xs text-red-600">{form.formState.errors.root?.message}</p>}
    </form>
  );
}
