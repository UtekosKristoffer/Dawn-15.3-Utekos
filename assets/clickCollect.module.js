// clickCollect.module.js
// Modul: Click & Collect – Shopify Integration
// Beskrivelse: Alt av logikk rundt Click & Collect-funksjon, delt opp for oversikt og gjenbruk

// === STATE ===
export let ClickCollectOptions = [];
export let ClickCollectInitialized = false;

// === UTILITY ===
export function formatCurrency(amountInCents, currency = 'kr') {
  if (typeof amountInCents !== 'number' || isNaN(amountInCents)) return 'N/A';
  return `${(amountInCents / 100).toFixed(2).replace('.', ',')} ${currency}`;
}

export function getFormattedVariantOptions(optionsWithValues) {
  if (!Array.isArray(optionsWithValues) || optionsWithValues.length === 0) return [];
  return optionsWithValues
    .filter((opt) => !(opt.name === 'Title' && opt.value === 'Default Title'))
    .map((opt) => ({ name: opt.name, value: opt.value }));
}

export function updateCartCount(count) {
  const cartCountEls = document.querySelectorAll('.cart-count-bubble, .cart-count');
  const actualCount = Number.isInteger(count) ? count : 0;
  cartCountEls.forEach((el) => (el.textContent = actualCount));
}

export async function fetchAndUpdateCartCount() {
  try {
    const res = await fetch('/cart.js');
    if (!res.ok) throw new Error(`/cart.js feilet: ${res.status}`);
    const cart = await res.json();
    const count = cart.total_quantity ?? cart.item_count ?? 0;
    updateCartCount(count);
    return cart;
  } catch (err) {
    console.error('[CartAPI] Feil ved henting av cart:', err);
    updateCartCount('!');
    return null;
  }
}

export function createHiddenInput(name, value) {
  if (value === undefined || value === null) return null;
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = typeof value === 'object' ? JSON.stringify(value) : value;
  return input;
}
