/* global subscribe, PUB_SUB_EVENTS */

(function () {
  if (!customElements.get('preview-handler')) {
    class ProductPreview extends HTMLElement {
      onVariantChangeUnsubscriber = undefined;
      variantIdInput = undefined;
      allVaultVariantsData = {};
      vaultImageGallery = undefined; // <--- Endret til det nye navnet

      constructor() {
        super();
        this.variantIdInput = this.querySelector('input[name="id"]');

        const vaultDataScript = this.querySelector('[data-all-vault-variants-json]');
        if (vaultDataScript) {
          try {
            this.allVaultVariantsData = JSON.parse(vaultDataScript.textContent);
          } catch (e) {
            console.error('Utekos: Feil ved parsing av data-all-vault-variants-json:', e);
          }
        }

        this.vaultImageGallery = this.querySelector('vault-image-swiper'); // <--- Endret til det nye tag-navnet
      }

      connectedCallback() {
        if (typeof subscribe !== 'undefined' && typeof PUB_SUB_EVENTS !== 'undefined') {
          this.onVariantChangeUnsubscriber = subscribe(
            PUB_SUB_EVENTS.optionValueSelectionChange,
            this.handleVaultVariantChange.bind(this)
          );
          console.log('Utekos ProductPreview: Abonnert på variantendringer.');
        } else {
          console.warn(
            'Utekos: Globale "subscribe" eller "PUB_SUB_EVENTS" ikke funnet. Sørg for at global.js er lastet før denne filen.'
          );
        }

        const initialVariantId = this.variantIdInput?.value;
        if (initialVariantId && this.allVaultVariantsData[initialVariantId]) {
          this.vaultImageGallery?.updateImages(
            this.allVaultVariantsData[initialVariantId].images.value
          );
        } else {
          const productDataElement = this.closest('section[data-product-json]');
          if (productDataElement && productDataElement.dataset.productJson) {
            try {
              const shopifyProductData = JSON.parse(productDataElement.dataset.productJson);
              this.vaultImageGallery?.updateImages(shopifyProductData.images.map((img) => img.src));
            } catch (e) {
              console.error(
                'Utekos: Feil ved parsing av product-json for initial image update:',
                e
              );
            }
          }
        }

        console.log('Utekos ProductPreview: Web Component initialisert og koblet til DOM.');
      }

      disconnectedCallback() {
        if (this.onVariantChangeUnsubscriber) {
          this.onVariantChangeUnsubscriber();
          console.log('Utekos ProductPreview: Avsluttet abonnement på variantendringer.');
        }
      }

      handleVaultVariantChange() {
        const currentVariantId = this.variantIdInput?.value;
        if (!currentVariantId) {
          console.warn('Utekos: Kunne ikke finne gjeldende variant-ID etter endring.');
          return;
        }

        const vaultData = this.allVaultVariantsData[currentVariantId];

        if (vaultData) {
          console.log('Utekos: Mottatt Vault Data for variant:', currentVariantId, vaultData);
          this.vaultImageGallery?.updateImages(vaultData.images.value);
        } else {
          console.log('Utekos: Ingen Vault Data funnet for variant-ID:', currentVariantId);
          const productDataElement = this.closest('section[data-product-json]');
          if (productDataElement && productDataElement.dataset.productJson) {
            try {
              const shopifyProductData = JSON.parse(productDataElement.dataset.productJson);
              this.vaultImageGallery?.updateImages(shopifyProductData.images.map((img) => img.src));
            } catch (e) {
              console.error(
                'Utekos: Feil ved parsing av product-json for fallback image update:',
                e
              );
            }
          }
        }
      }
    }

    customElements.define('preview-handler', ProductPreview);
  }
})();
