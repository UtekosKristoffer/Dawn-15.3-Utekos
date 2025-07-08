if (!customElements.get('click-collect')) {
  customElements.define(
    'click-collect',
    // Arver fra den mest grunnleggende byggeklossen.
    // Den starter sin egen "familie-gren".
    class ClickCollect extends HTMLElement {
      constructor() {
        super();
        this.variantId = this.dataset.initialVariantId;
        this.pickupContainer = this.querySelector('.pickup-availability-container');
        this.loader = this.querySelector('.loader');

        // Lytt etter endringer fra produktets variant-velger
        // (antar at den publiserer et 'variant:change'-event)
        this.variantChangeUnsubscriber = subscribe('variant:change', (event) => {
          this.variantId = event.dataset.variantId;
          this.fetchPickupAvailability();
        });

        // Hent data for den initielle varianten
        this.fetchPickupAvailability();
      }

      disconnectedCallback() {
        // Rydd opp etter seg
        if (this.variantChangeUnsubscriber) {
          this.variantChangeUnsubscriber();
        }
      }

      // DENNE KOMPONENTENS EGEN, SPESIALISERTE METODE
      fetchPickupAvailability() {
        if (!this.variantId) return;

        this.toggleLoading(true);
        this.pickupContainer.innerHTML = ''; // Tøm gammelt innhold

        // Et helt eget fetch-kall til riktig Shopify API-endepunkt
        const url = `${routes.root_url}variants/${this.variantId}/?section_id=pickup-availability`;

        fetch(url)
          .then((response) => response.text())
          .then((text) => {
            // Shopify returnerer rendret HTML for en 'pickup-availability'-seksjon
            const availabilityHTML = new DOMParser().parseFromString(text, 'text/html');
            const newContent = availabilityHTML.querySelector('.shopify-section');
            if (newContent) this.pickupContainer.innerHTML = newContent.innerHTML;
          })
          .catch((e) => {
            console.error(e);
            this.pickupContainer.innerHTML = 'Kunne ikke hente lagerstatus.';
          })
          .finally(() => {
            this.toggleLoading(false);
          });
      }

      toggleLoading(isLoading) {
        if (this.loader) this.loader.hidden = !isLoading;
      }
    }
  );
}

let selectedMethod = null;
document.getElementById('addtobag').addEventListener('click', () => {
  const variantId = document.querySelector('input[name="id"]').value;
  const quantity = parseInt(document.querySelector('input[name="quantity"]').value, 10);

  if (!variantId || !quantity || !selectedMethod) {
    alert('Velg størrelse, antall og leveringsmetode før du legger i handlepose.');
    return;
  }

  function handleAddToCart({ variantId, quantity, method }) {
    if (method === 'send') {
      // Legg til i vanlig handlekurv
    } else if (method === 'collect') {
      // Åpne Click & Collect-popup
    }
  }
  handleAddToCart({ variantId, quantity, method: selectedMethod });
});
