'use client';

import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addLines } from '@/Actions/Cart/actions';

const schema = z.object({ variantId: z.string().min(1), quantity: z.number().int().min(1) });
type Values = z.infer<typeof schema>;

export default function AddToCart({ variantId }: { variantId: string }) {
  const [state, formAction, pending] = useActionState(addLines, { ok: false } as const); // React 19 API :contentReference[oaicite:9]{index=9}
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { variantId, quantity: 1 } });

  return (
    <form action={(fd) => formAction({ variantId: String(fd.get('variantId')), quantity: Number(fd.get('quantity')) })}>
      {/* bind dine felter, evt. shadcn Form-komponentene dine */} :contentReference[oaicite:10]{index=10} :contentReference[oaicite:11]{index=11}
      <button type="submit" disabled={pending}>{pending ? 'Legger til' : 'Legg i kurv'}</button>
      {!state.ok && 'error' in state ? <p>{state.error}</p> : null}
    </form>
  );
}
