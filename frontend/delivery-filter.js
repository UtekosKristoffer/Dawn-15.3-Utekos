const deliveryButtons = document.querySelectorAll('[data-delivery-method]');

deliveryButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    deliveryButtons.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    selectedMethod = btn.dataset.deliveryMethod;
  });
});

// Add to cart-knappen
document.getElementById('addtobag').addEventListener('click', () => {
  const variantId = document.querySelector('input[name="id"]').value;
  const quantity = parseInt(document.querySelector('input[name="quantity"]').value, 10);

  if (!variantId || !quantity || !selectedMethod) {
    alert('Velg størrelse, antall og leveringsmetode før du legger i handlepose.');
    return;
  }

  const formData = {
    items: [
      {
        id: variantId,
        quantity: quantity,
        properties: {
          Leveringsmetode: selectedMethod,
        },
      },
    ],
  };

  fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Produkt lagt til:', data);
      // f.eks. åpne cart drawer her
    })
    .catch((error) => {
      console.error('Feil ved add to cart:', error);
    });
});

if (this.#addToCartButton) {
  const available = targetShopifyVariant?.available;
  const buttonTextEl = this.#addToCartButton.querySelector('[data-add-to-cart-text]');
  const text = available
    ? window.variantStrings?.addToCart || 'Legg i handlepose'
    : targetShopifyVariant
      ? window.variantStrings?.soldOut || 'Utsolgt'
      : window.variantStrings?.unavailable || 'Utilgjengelig';
  this.#addToCartButton.disabled = !available;
  if (buttonTextEl) buttonTextEl.textContent = text;
  else this.#addToCartButton.textContent = text;
}
