// ==== Del 1: Logikk for å sende produkt-skjema via AJAX ====

if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLFormElement {
      constructor() {
        super();
        this.addEventListener('submit', this.onSubmitHandler.bind(this));
      }

      async onSubmitHandler(evt) {
        evt.preventDefault();
        const submitButton = this.querySelector('[type="submit"]');

        submitButton.setAttribute('disabled', true);
        submitButton.classList.add('loading');

        const formData = new FormData(this);

        try {
          const response = await fetch('/cart/add.js', {
            method: 'POST',
            body: formData,
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              Accept: 'application/javascript',
            },
          });

          if (response.status !== 200) {
            throw new Error(`Request failed with status ${response.status}`);
          }

          // Få den oppdaterte handlekurven fra Shopify
          const newCart = await (await fetch('/cart.js')).json();

          // Send ut et globalt event som headeren kan lytte til
          document.dispatchEvent(
            new CustomEvent('cart:updated', {
              bubbles: true,
              detail: { cart: newCart },
            })
          );
        } catch (error) {
          console.error('Error adding to cart:', error);
          // Håndter feil her, f.eks. vis en feilmelding til kunden
        } finally {
          submitButton.removeAttribute('disabled');
          submitButton.classList.remove('loading');
        }
      }
    }
  );
}

// ==== Del 2: Logikk for å lytte og oppdatere handlekurv-tallet i headeren ====

document.addEventListener('DOMContentLoaded', () => {
  // Lytt etter vårt egendefinerte event
  document.addEventListener('cart:updated', (evt) => {
    const cart = evt.detail.cart;
    updateCartCountBubble(cart.item_count);
  });
});

function updateCartCountBubble(count) {
  // Finner alle tellere, siden du har en for mobil og en for desktop
  const cartCountBubbles = document.querySelectorAll('.cart-count-bubble');

  cartCountBubbles.forEach((bubble) => {
    const countElement = bubble.querySelector('span');

    if (count > 0) {
      // Sørg for at tallet er synlig og korrekt
      bubble.classList.remove('hidden');
      if (countElement) {
        countElement.textContent = count;
      }
    } else {
      // Skjul boblen hvis handlekurven er tom
      bubble.classList.add('hidden');
    }
  });
}
