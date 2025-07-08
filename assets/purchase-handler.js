if (!customElements.get('purchase-handler')) {
  class PurchaseHandler extends HTMLElement {
    constructor() {
      super();
      console.log('PurchaseHandler: 1. Komponenten er opprettet (constructor)');

      this.selectedDeliveryMethod = 'send';
      this.currentVariant = null;
      this.currentQuantity = 1;
      this.productData = null;
      this.variantUnsubscriber = null;
    }

    connectedCallback() {
      console.log('PurchaseHandler: 2. Komponenten er koblet til DOM (connectedCallback)');
      this._setupComponent();
      this._bindEvents();
      this.updateVisualState();
    }

    disconnectedCallback() {
      console.log(
        'PurchaseHandler: Komponenten er frakoblet (disconnectedCallback), rydder opp abonnement.'
      );
      if (this.variantUnsubscriber) {
        this.variantUnsubscriber();
      }
    }

    _setupComponent() {
      console.log('PurchaseHandler: 3. Setter opp DOM-referanser og initiell tilstand');
      this.deliveryOptions = this.querySelectorAll('[data-value]');
      this.actionButton = this.querySelector('#addtobag');
      this.popup = document.querySelector('#ClickCollectPopUp');
      this.popupCloseButton = this.popup?.querySelector('.popup-close-button');
      this.quantityInput = this.querySelector('quantity-input input');

      if (this.dataset.productJson) {
        this.productData = JSON.parse(this.dataset.productJson);
        console.log('PurchaseHandler: Produkt-JSON er parset:', this.productData);
      }

      this.currentVariant = this._findVariantById(
        this.dataset.initialVariantId || this.productData?.variants[0].id
      );
      this.currentQuantity = this.quantityInput ? parseInt(this.quantityInput.value, 10) : 1;
      console.log(
        'PurchaseHandler: Initiell tilstand satt -> Variant:',
        this.currentVariant?.id,
        'Antall:',
        this.currentQuantity
      );
    }

    _bindEvents() {
      this.deliveryOptions.forEach((button) => {
        button.addEventListener('click', this.handleDeliveryChange.bind(this));
      });

      this.actionButton?.addEventListener('click', this.handleActionClick.bind(this));
      this.popupCloseButton?.addEventListener('click', this.closeCollectPopup.bind(this));

      this.addEventListener('change', this.handleQuantityChange.bind(this));

      if (typeof subscribe === 'function') {
        this.variantUnsubscriber = subscribe('variant:change', this.onVariantChange.bind(this));
        console.log('PurchaseHandler: 4. Lytter nå på "variant:change"-eventet.');
      }
    }

    handleDeliveryChange(event) {
      this.selectedDeliveryMethod = event.currentTarget.dataset.value;
      console.log('PurchaseHandler: Leveringsmetode endret til ->', this.selectedDeliveryMethod);
      this.updateVisualState();
    }

    handleQuantityChange(event) {
      if (event.target.closest('quantity-input')) {
        this.currentQuantity = parseInt(event.target.value, 10);
        console.log('PurchaseHandler: Antall endret til ->', this.currentQuantity);
      }
    }

    updateVisualState() {
      this.deliveryOptions.forEach((button) => {
        button.classList.toggle('is-active', button.dataset.value === this.selectedDeliveryMethod);
      });
    }

    onVariantChange(event) {
      const newVariant = event.detail?.variant;
      if (newVariant) {
        this.currentVariant = newVariant;
        console.log(
          'PurchaseHandler: Mottok "variant:change". Ny aktiv variant ->',
          this.currentVariant
        );
      }
    }

    async handleActionClick() {
      console.log('PurchaseHandler: "Legg i handlepose" klikket!');
      if (!this.currentVariant) {
        alert('Vennligst velg en variant');
        return;
      }

      try {
        console.log('PurchaseHandler: Valgt metode er ->', this.selectedDeliveryMethod);
        if (this.selectedDeliveryMethod === 'send') {
          await this.executeSend();
        } else {
          this.executeCollect();
        }
      } catch (error) {
        console.error('PurchaseHandler: En feil oppstod under hovedhandlingen:', error);
        this.setErrorMessage('Beklager, noe gikk galt. Prøv igjen.');
      }
    }

    async executeSend() {
      const items = {
        [this.currentVariant.id]: this.currentQuantity,
      };

      console.log('PurchaseHandler: Kaller "updateMultipleQty" med ->', items);
      if (typeof updateMultipleQty !== 'function') {
        throw new Error('Den globale funksjonen updateMultipleQty er ikke tilgjengelig.');
      }
      return updateMultipleQty(items, this);
    }

    executeCollect() {
      console.log('PurchaseHandler: Utfører "executeCollect".');
      if (!this.popup) return;

      this._populateCollectPopup();

      this.popup.style.display = 'flex';
      document.body.classList.add('overflow-hidden');
      console.log('PurchaseHandler: Click & Collect popup er vist.');
    }

    closeCollectPopup() {
      if (this.popup) {
        this.popup.style.display = 'none';
        document.body.classList.remove('overflow-hidden');
        console.log('PurchaseHandler: Click & Collect popup er lukket.');
      }
    }

    _populateCollectPopup() {
      const container = this.popup.querySelector('.ClickCollectOptions');
      if (!container || !this.currentVariant) return;

      console.log(
        'PurchaseHandler: Fyller ut popup med data for variant ->',
        this.currentVariant.id
      );
      const price = (this.currentVariant.price / 100).toFixed(2);
      const image = this.currentVariant.featured_image || this.productData.featured_image;

      const productHTML = `
            <div class="collect-item">
                <img src="${image.src}" alt="${image.alt || this.currentVariant.title}" width="100">
                <div class="collect-item-details">
                    <h4>${this.currentVariant.title}</h4>
                    <p>Antall: ${this.currentQuantity}</p>
                    <p>Pris: ${price} kr</p>
                </div>
            </div>
        `;
      container.innerHTML = productHTML;
    }

    _findVariantById(variantId) {
      if (!this.productData || !variantId) return null;
      return this.productData.variants.find((v) => v.id.toString() === variantId.toString());
    }

    getSectionsToRender() {
      const sections = [
        { id: 'cart-icon-bubble', section: 'cart-icon-bubble', selector: '.shopify-section' },
        { id: 'CartDrawer', selector: '.drawer__inner', section: 'cart-drawer' },
      ];
      console.log('PurchaseHandler: Leverer seksjoner for oppdatering ->', sections);
      return sections;
    }

    toggleLoading(isLoading) {
      console.log('PurchaseHandler: Toggler loading-state ->', isLoading);
      this.actionButton?.classList.toggle('is-loading', isLoading);
      if (this.actionButton) this.actionButton.disabled = isLoading;
    }

    setErrorMessage(message) {
      console.log('PurchaseHandler: Setter feilmelding ->', message);
      const errorElement = this.querySelector('.form-error');
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.hidden = false;
      }
    }
  }

  customElements.define('purchase-handler', PurchaseHandler);
}
