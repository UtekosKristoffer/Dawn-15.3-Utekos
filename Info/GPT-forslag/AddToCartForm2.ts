'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import addLines from '@/Actions/Cart/addLines';
import { useQueryClient } from '@tanstack/react-query';

const Schema = z.object({ variantId: z.string().min(1), quantity: z.number().int().min(1) });
type Values = z.infer<typeof Schema>;

export default function AddToCartForm({ variantId }: { variantId: string }) {
  const form = useForm<Values>({
    resolver: zodResolver(Schema),
    defaultValues: { variantId, quantity: 1 },
  }); // RHF TypeScript‑bruk :contentReference[oaicite:19]{index=19}

  const [state, action, pending] = useActionState(addLines, { success: false, message: '' }); // :contentReference[oaicite:20]{index=20}
  const qc = useQueryClient();

  useEffect(() => {
    if (state?.success) {
      qc.invalidateQueries({ queryKey: ['cart'] }); // lokal klientcache
      form.reset();
    } else if (state?.error) {
      form.setError('root', { message: state.message });
    }
  }, [state, qc, form]);

  return (
    <form onSubmit={form.handleSubmit((data) => action(data))}>
      {/* dine felter */}
      <button type="submit" disabled={pending}>
        {pending ? 'Legger til…' : 'Legg i kurv'}
      </button>
      {form.formState.errors.root?.message}
    </form>
  );
}
