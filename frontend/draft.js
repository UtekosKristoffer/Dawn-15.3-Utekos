//@ts-nocheck
import debounce from 'lodash-es/debounce';
import { subscribe, publish } from '../lib/pubsub.js'; // Antatt plassering

if (!customElements.get('preview-handler')) {
    customElements.define(
        'preview-handler',
        class PreviewHandler extends HTMLElement {
            // 1. Definer felter for tilstand og DOM-referanser
            #productData = null;
            #variantsMap = null;
            #productForm = null;
            #variantIdInput = null;
            #addToCartButton = null;
            #deliveryOptions = null;
            #clickAndCollectPopup = null;
            #clickAndCollectCloseButton = null;
            #onOptionChangedDebounced = null;
            #updateURL = null;
            #optionsToVariantMap = null;

            constructor() {
                super();
            }

            connectedCallback() {
                try {
                    this.#loadData();
                    this.#cacheDOMElements();
                    this.#initializeTools();
                    this.#attachEventListeners();
                    this.#initializeUI();
                } catch (error) {
                    console.error('Feil under initialisering av <preview-handler>:', error);
                    this.classList.add('is-error');
                }
            }



            disconnectedCallback() {
                this.#removeEventListeners();
            }


            #loadData() {
                const dataScript = this.querySelector('script[data-product-configuration]');
                if (!dataScript) throw new Error('Dataskript [data-product-configuration] mangler.');

                const data = JSON.parse(dataScript.textContent);
                this.#productData = data;
                this.#variantsMap = data.variantsMap;
                this.#optionsToVariantMap = new Map(); // Vårt nye oppslagskart

                if (!this.#variantsMap || Object.keys(this.#variantsMap).length === 0) {
                    throw new Error('"variantsMap" mangler eller er tom i dataskriptet.');
                }

                for (const variant of Object.values(this.#variantsMap)) {
                    const optionsKey = variant.shopify_product_data.options.join('-');
                    this.#optionsToVariantMap.set(optionsKey, variant);
                }
            }

            #cacheDOMElements() {
                this.#productForm = this.querySelector('form');
                if (!this.#productForm) throw new Error('Finner ikke <form> inni komponenten.');

                this.#variantIdInput = this.#productForm.querySelector('input[name="id"]');
                this.#addToCartButton = this.#productForm.querySelector('button[type="submit"]');

                if (!this.#variantIdInput || !this.#addToCartButton) {
                    throw new Error('Mangler kritisk variant-input eller submit-knapp.');
                }

                this.#deliveryOptions = this.querySelector('#delivery-method-options');
                if (!this.#deliveryOptions) {
                    console.warn('Advarsel: Fant ikke container for leveringsvalg (#delivery-method-options).');
                }

                this.#clickAndCollectPopup = this.querySelector('#click-and-collect');
                this.#clickAndCollectCloseButton = this.querySelector('.popup-close-button');

                if (!this.#clickAndCollectPopup) {
                    console.warn('Advarsel: Fant ikke Click & Collect popup (#click-and-collect).');
                }
            }

            #initializeTools() {
                this.#onOptionChangedDebounced = debounce(this.#onOptionChange.bind(this), 300);
            }

            #attachEventListeners() {
                this.#productForm.addEventListener('change', this.#onOptionChangedDebounced);

                if (this.#deliveryOptions) {
                    this.#deliveryOptions.addEventListener('click', this.#handleDeliveryOptionClick.bind(this));
                }

                if (this.#clickAndCollectCloseButton) {
                    this.#clickAndCollectCloseButton.addEventListener('click', this.#closeClickCollectPopup.bind(this));
                }
            }


            #removeEventListeners() {
                this.#productForm.removeEventListener('change', this.#onOptionChangedDebounced);

                if (this.#deliveryOptions) {
                    this.#deliveryOptions.removeEventListener('click', this.#handleDeliveryOptionClick.bind(this));
                }

                if (this.#clickAndCollectCloseButton) {
                    this.#clickAndCollectCloseButton.removeEventListener('click', this.#closeClickCollectPopup.bind(this));
                }
            }


            #initializeUI() {
                const urlParams = new URLSearchParams(window.location.search);
                const variantIdFromUrl = urlParams.get('variant');

                const targetVariantId = variantIdFromUrl || this.#productData.initialVariantId;
                const activeVariant = this.#variantsMap[targetVariantId];

                if (!activeVariant) {
                    console.warn(`Kunne ikke finne start-variant med ID: ${targetVariantId}`);
                    this.#onOptionChange();
                    return;
                }

                const productOptions = this.#productData.product?.options;
                if (!productOptions) return;

                productOptions.forEach(option => {
                    const optionKey = `option${option.position}`;
                    const targetValue = activeVariant.shopify_product_data[optionKey];
                    if (!targetValue) return;

                    // Bygger nå den konsistente 'name'-attributten
                    const inputName = `${option.name}-${option.position}`;

                    try {
                        const inputToSelect = this.#productForm.querySelector(
                            `input[type="radio"][name="${inputName}"][value="${targetValue}"]`
                        );
                        if (inputToSelect) {
                            inputToSelect.checked = true;
                        }
                    } catch (e) {
                        console.error(`Feil ved søk etter input for: ${inputName}='${targetValue}'`, e);
                    }
                });
                // Utfør første gangs "endring" for å oppdatere alt.
                this.#onOptionChange();
            }


            #onOptionChange() {
                const selectedInputs = this.#productForm.querySelectorAll('input[type="radio"]:checked');
                const selectedOptions = Array.from(selectedInputs).map(input => input.value);
                const optionsKey = selectedOptions.join('-');


                const newVariant = this.#optionsToVariantMap.get(optionsKey);


                if (newVariant) {
                    const variantData = newVariant.shopify_product_data;


                    this.#variantIdInput.value = variantData.id;


                    this.#addToCartButton.disabled = false;
                    this.#addToCartButton.querySelector('label').textContent = window.variantStrings.addToCart || 'Legg i handlekurv';


                    this.#updateURL(variantData.id);

                } else {

                    this.#variantIdInput.value = '';
                    this.#addToCartButton.disabled = true;
                    this.#addToCartButton.querySelector('label').textContent = window.variantStrings.unavailable || 'Utilgjengelig';
                }


                publish('variantChange', {
                    source: 'preview-handler',
                    variant: newVariant,
                    product: this.#productData.product
                });
            }

              updateVariantInputs(variantId) {
        this.querySelectorAll(
          `#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`
        ).forEach((productForm) => {
          const input = productForm.querySelector('input[name="id"]');
          input.value = variantId ?? '';
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
      }


            #updateURL(variantId) {
                if (!this.dataset.updateUrl === 'true' || !variantId) return;

                const url = new URL(window.location);
                url.searchParams.set('variant', variantId);
                window.history.replaceState({ path: url.toString() }, '', url.toString());
            }

            get productForm() {
                return this.querySelector(`product-form`);
            }

            get productModal() {
                return document.querySelector(`#ProductModal-${this.dataset.section}`);
            }

            get pickupAvailability() {
                return this.querySelector(`pickup-availability`);
            }

            get variantSelectors() {
                return this.querySelector('variant-selects');
            }

            get relatedProducts() {
                const relatedProductsSectionId = SectionId.getIdForSection(
                    SectionId.parseId(this.sectionId),
                    'related-products'
                );
                return document.querySelector(`product-recommendations[data-section-id^="${relatedProductsSectionId}"]`);
            }

            get quickOrderList() {
                const quickOrderListSectionId = SectionId.getIdForSection(
                    SectionId.parseId(this.sectionId),
                    'quick_order_list'
                );
                return document.querySelector(`quick-order-list[data-id^="${quickOrderListSectionId}"]`);
            }

            get sectionId() {
                return this.dataset.originalSection || this.dataset.section;
            }
        }
    );
}
