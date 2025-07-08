//@ts-nocheck
import debounce from 'lodash-es/debounce';
import { publish } from '../lib/pubsub.js';
export class ProductPreviewHandler extends HTMLElement {
  // 1. Rene og relevante klassefelter
  #productData = null;
  #variantsMap = null;
  #optionsToVariantMap = null;
  #productForm = null;
  #variantIdInput = null;
  #addToCartButton = null;
  #deliveryOptions = null;
  #onOptionChangedDebounced = null;
  #selectedDeliveryMethod = 'shipping'; // Ny: Holder styr på valgt metode

  constructor() {
    super();
    // Bind 'this' for alle metoder som brukes som event handlers
    this.#handleFormSubmit = this.#handleFormSubmit.bind(this);
    this.#handleDeliveryOptionClick = this.#handleDeliveryOptionClick.bind(this);
  }

  connectedCallback() {
    try {
      this.#loadData();
      this.#cacheDOMElements();
      this.#initializeTools();
      this.#attachEventListeners();
      this.#initializeUI();
      this.dispatchEvent(new CustomEvent('preview-handler:loaded', { bubbles: true }));
    } catch (error) {
      console.error('Feil under initialisering av <preview-handler>:', error);
      this.classList.add('is-error');
    }
  }

  disconnectedCallback() {
    this.#removeEventListeners();
  }

  // --- KJERNE-METODER ---

  #loadData() {
    const dataScript = this.querySelector('script[data-product-configuration]');
    if (!dataScript) throw new Error('Dataskript [data-product-configuration] mangler.');
    const data = JSON.parse(dataScript.textContent);
    this.#productData = data;
    this.#variantsMap = data.variantsMap;
    this.#optionsToVariantMap = new Map();
    if (!this.#variantsMap) throw new Error('"variantsMap" mangler i dataskriptet.');
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
    this.#deliveryOptions = this.querySelector('#delivery-method-options');
    this.#addToCartButton.setAttribute('aria-disabled', 'true');
    this.#addToCartButton.classList.add('loading');
    if (!this.#variantIdInput || !this.#addToCartButton) {
      throw new Error('Mangler kritisk variant-input eller submit-knapp.');
    }
  }

  #initializeTools() {
    this.#onOptionChangedDebounced = debounce(this.#onOptionChange.bind(this), 300);
  }

  #attachEventListeners() {
    this.#productForm.addEventListener('change', this.#onOptionChangedDebounced);
    this.#productForm.addEventListener('submit', this.#handleFormSubmit);
    this.#deliveryOptions?.addEventListener('click', this.#handleDeliveryOptionClick);
  }

  #removeEventListeners() {
    this.#productForm.removeEventListener('change', this.#onOptionChangedDebounced);
    this.#productForm.removeEventListener('submit', this.#handleFormSubmit);
    this.#deliveryOptions?.removeEventListener('click', this.#handleDeliveryOptionClick);
  }

  #initializeUI() {
    const urlParams = new URLSearchParams(window.location.search);
    const variantIdFromUrl = urlParams.get('variant');
    const targetVariantId = variantIdFromUrl || this.#productData.initialVariantId;
    const activeVariant = this.#variantsMap[targetVariantId];

    if (activeVariant) {
      const productOptions = this.#productData.product?.options;
      if (!productOptions) return;
      productOptions.forEach((option) => {
        const optionKey = `option${option.position}`;
        const targetValue = activeVariant.shopify_product_data[optionKey];
        const inputName = `${option.name}-${option.position}`;
        const inputToSelect = this.#productForm.querySelector(
          `input[type="radio"][name="${inputName}"][value="${targetValue}"]`
        );
        if (inputToSelect) inputToSelect.checked = true;
      });
    }
    this.#onOptionChange();
  }

  #onOptionChange() {
    const selectedInputs = this.#productForm.querySelectorAll(
      'input[type="radio"][name^="Størrelse"], input[type="radio"][name^="Farge"]'
    );
    const checkedInputs = Array.from(selectedInputs).filter((input) => input.checked);
    const selectedOptions = checkedInputs.map((input) => input.value);
    const optionsKey = selectedOptions.join('-');
    const newVariant = this.#optionsToVariantMap.get(optionsKey);

    this.#updateURL(newVariant?.shopify_product_data.id);
    this.#updateVariantInput(newVariant?.shopify_product_data.id);
    this.#updateAddToCartButton(newVariant);

    publish('variantChange', {
      variant: newVariant?.shopify_product_data,
      product: this.#productData.product,
    });
  }

  // --- EVENT HANDLERS & UI UPDATERS ---

  #handleDeliveryOptionClick(event) {
    const selectedButton = event.target.closest('button[data-button-option]');
    if (!selectedButton) return;

    this.#selectedDeliveryMethod = selectedButton.dataset.buttonOption;

    this.#deliveryOptions.querySelectorAll('button').forEach((button) => {
      button.classList.toggle('active', button === selectedButton);
    });

    const radioInput = selectedButton.querySelector('input[type="radio"]');
    if (radioInput) radioInput.checked = true;

    this.#onOptionChange(); // Re-evaluer knappens tilstand
  }

  #handleFormSubmit(event) {
    if (this.#selectedDeliveryMethod === 'collect') {
      event.preventDefault();
      const activeVariantId = this.#variantIdInput.value;
      const activeVariant = this.#variantsMap[activeVariantId];
      const quantityInput = this.querySelector('[name="quantity"]');
      const quantity = quantityInput ? parseInt(quantityInput.value, 10) || 1 : 1;

      const root = this.closest('product-preview-handler') || this;
      const clickCollectComponent = root.querySelector('click-collect-handler');

      if (clickCollectComponent && activeVariant) {
        clickCollectComponent.open(activeVariant.shopify_product_data, quantity);
      }
    }
  }

  #updateVariantInput(variantId) {
    this.#variantIdInput.value = variantId || '';
  }

  #updateAddToCartButton(variant) {
    const btnText = this.#addToCartButton.querySelector('.btn-text');
    const spinner = this.#addToCartButton.querySelector('.loading-spinner');

    if (!btnText) return;

    if (variant && variant.shopify_product_data.available) {
      this.#addToCartButton.disabled = false;
      this.#addToCartButton.setAttribute('aria-disabled', 'false');

      btnText.textContent =
        this.#selectedDeliveryMethod === 'collect' ? 'Reserver varen' : 'Legg i handlekurv';

      if (spinner) spinner.classList.add('hidden');
    } else {
      this.#addToCartButton.disabled = true;
      this.#addToCartButton.setAttribute('aria-disabled', 'true');

      btnText.textContent = variant ? 'Utsolgt' : 'Utilgjengelig';

      if (spinner) spinner.classList.add('hidden');
    }
  }

  #updateURL(variantId) {
    const updateUrl = this.dataset.updateUrl === 'true';
    if (!updateUrl || !variantId) return;

    const url = new URL(window.location);
    url.searchParams.set('variant', variantId);
    window.history.replaceState({ path: url.toString() }, '', url.toString());
  }


  get ClickCollectHandler(){
    return this.#productForm.querySelector('button[type="submit"]');
  }

  get productForm() {
    return this.querySelector(`product-form`);
  }

  get sectionId() {
    return this.dataset.originalSection || this.dataset.section;
  }
}
