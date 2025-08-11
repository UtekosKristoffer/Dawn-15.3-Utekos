//Disse funksjonene ligger i hver sine filer. Legger de i en fil nå for enkelthetens skyld

import type { CartLine } from "@/Types/types";

function addOrMergeLine(lines: CartLine[], line: CartLine): CartLine[] {
  const idx = lines.findIndex((l) => l.id === line.id);
  if (idx === -1) {
    const qty = Math.max(1, line.quantity ?? 1);
    return [...lines, { ...line, quantity: qty }];
  }
  const next = lines.slice();
  const existing = next[idx];
  next[idx] = { ...existing, quantity: existing.quantity + line.quantity };
  return next;
}

export default addOrMergeLine;


import setLineQuantity from "./setLineQuantity";
import type { CartLine } from "@/Types/types";

function decrementLine(lines: CartLine[], id: string, by = 1): CartLine[] {
  const current = lines.find((l) => l.id === id)?.quantity ?? 0;
  return setLineQuantity(lines, id, current - by);
}

export default decrementLine;

import setLineQuantity from "./setLineQuantity";
import type { CartLine } from "@/Types/types";

function incrementLine(lines: CartLine[], id: string, by = 1): CartLine[] {
  const current = lines.find((l) => l.id === id)?.quantity ?? 0;
  return setLineQuantity(lines, id, current + by);
}

export default incrementLine;

import type { CartLine } from "@/Types/types";

function removeLine(lines: CartLine[], id: string): CartLine[] {
  return lines.filter((l) => l.id !== id);
}

export default removeLine;

import type { CartState } from "@/Types/types";

export const selectLines = (s: { context: CartState }) => s.context.lines;

export const selectItemCount = (s: { context: CartState }) =>
  s.context.lines.reduce((n, l) => n + l.quantity, 0);

export const selectSubtotal = (s: { context: CartState }) =>
  s.context.lines.reduce((sum, l) => sum + l.price * l.quantity, 0);

export const selectHasItems = (s: { context: CartState }) =>
  s.context.lines.length > 0;
import type { CartLine } from "@/Types/types";

function setLineQuantity(
  lines: CartLine[],
  id: string,
  quantity: number
): CartLine[] {
  if (quantity <= 0) return lines.filter((l) => l.id !== id);
  return lines.map((l) => (l.id === id ? { ...l, quantity } : l));
}

export default setLineQuantity;
