//@ts-nocheck
import debounce from 'lodash-es/debounce';

if (!customElements.get('product-preview-handler')) {
  customElements.define(
    'product-preview-handler',
    class ProductPreviewHandler extends HTMLElement {
      // 1. Definer alle klassefelter (properties) øverst for oversikt
      #productForm = null;
      #shopifyProductData = null;
      #allVaultVariantData = null;
      #productOptions = []; // Omdøpt fra #uiGeneratedOptions for klarhet
      #variantIdInput = null;
      #addToCartButton = null;
      #onOptionChangedDebounced = null;
      #activeVariant = null;

      // 2. Minimal constructor som kun kaller super()
      constructor() {
        super();
      }

      // 3. Hoved-initialisering skjer her, når elementet er i DOM
      connectedCallback() {
        try {
          if (!this.#loadInitialData()) {
            throw new Error('Kunne ikke laste inn kritiske data.');
          }
          if (!this.#setupFormElements()) {
            throw new Error('Kunne ikke sette opp nødvendige skjema-elementer.');
          }

          // Klargjør verktøy og start-tilstand
          this.#productOptions = this.#parseShopifyOptions(this.#shopifyProductData);
          this.#onOptionChangedDebounced = debounce(this.#onOptionChange.bind(this), 250);
          
          this.#initializeOptions();
          this.#addEventListeners();

        } catch (error) {
          console.error(`Feil under initialisering av <preview-handler>: ${error.message}`, this);
          // Vurder å vise en feilmelding til brukeren i UI-et
          this.classList.add('is-error');
        }
      }

      // 4. Opprydning skjer her, når elementet fjernes fra DOM
      disconnectedCallback() {
        this.#removeEventListeners();
      }


  constructor(sectionElement) {
    if (!sectionElement) {
      throw new Error('ProductPreviewHandler: Krever et gyldig sectionElement for initialisering.');
    }
    this.#sectionElement = sectionElement;

    if (!this.#loadInitialData() || !this.#setupFormElements()) {
      throw new Error(
        'ProductPreviewHandler: Kunne ikke laste kritiske data eller finne nødvendige form-elementer.'
      );
    }

    this.#uiGeneratedOptions = this.#parseShopifyOptions(this.#shopifyProductData);
     this.#onOptionChangedDebounced = debounce(this.#handleOptionChange.bind(this), 300);
    this.init();
  }


  #safeParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

#parseJsonElement(selector) {
  const el = this.#sectionElement.querySelector(selector);
  if (!el || !el.textContent?.trim()) return null;
  return this.#safeParseJson(el.textContent);
}

#loadInitialData() {
  try {
    this.#shopifyProductData =
      this.#parseJsonElement('script[data-product-json]') ||
      this.#safeParseJson(this.#sectionElement.dataset.productJson);

    this.#allVaultVariantData = this.#parseJsonElement('script[data-product-variants-json]');

    if (
      !this.#shopifyProductData ||
      typeof this.#shopifyProductData !== 'object' ||
      !Array.isArray(this.#shopifyProductData.variants) ||
      this.#shopifyProductData.variants.length === 0 ||
      !this.#allVaultVariantData
    ) {
      return false;
    }

    return true;
  } catch (e) {
    this.#shopifyProductData = null;
    this.#allVaultVariantData = null;
    return false;
  }
}

#setupFormElements() {
  const productFormId = this.#sectionElement.dataset.productFormId;
  if (!productFormId) {
    console.error('Data-attributt for produkt-skjema ID mangler.', this.#sectionElement);
    return false;
  }

  this.#productForm = this.#sectionElement.querySelector(`#${productFormId}`);
  if (!this.#productForm) {
    console.error(`Produkt-skjema med ID #${productFormId} ble ikke funnet i DOM.`);
    return false;
  }

  this.#variantIdInput = this.#productForm.querySelector('[data-variant-id-input]');
  this.#addToCartButton = this.#productForm.querySelector('[data-add-to-cart-button]');

  if (!this.#variantIdInput || !this.#addToCartButton) {
    console.error('Nødvendige skjemakontroller (variant-input, add-to-cart-knapp) mangler.', {
      form: this.#productForm,
      variantInput: this.#variantIdInput,
      addToCartButton: this.#addToCartButton,
    });
    return false;
  }

  return true;
}
  #parseShopifyOptions(productData) {
    let optionsSource = productData.options_with_values?.length
      ? productData.options_with_values
      : productData.options;
    if (!Array.isArray(optionsSource)) return [];
    if (typeof optionsSource[0] === 'string') {
      optionsSource = optionsSource.map((name, idx) => ({ name, position: idx + 1 }));
    }
    return optionsSource.filter(
      (opt) => opt?.name && typeof opt.name === 'string' && opt.name.toLowerCase() !== 'unisex'
    );
  }

  #escapeCSSSelector(str) {
    if (typeof CSS?.escape === 'function') return CSS.escape(str);
    if (typeof str !== 'string') return '';
    return str.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1');
  }

  #getSelectedShopifyOptions() {
    const selected = {};
    if (!this.#uiGeneratedOptions.length) return selected;
    this.#uiGeneratedOptions.forEach((optionDef) => {
      if (!optionDef.name || typeof optionDef.position !== 'number') return;
      const optionKey = `option${optionDef.position}`;
      const escapedOptionName = this.#escapeCSSSelector(optionDef.name);
      const selector = `.product-option-input[name="options[${escapedOptionName}]"]:checked`;
      const checkedRadio = this.#productForm.querySelector(selector);
      selected[optionKey] =
        checkedRadio?.value ?? this.#shopifyProductData.variants[0]?.[optionKey];
    });
    return selected;
  }

  #findShopifyVariant(selectedUIOpts) {
    if (!this.#shopifyProductData?.variants?.length) return null;
    return this.#shopifyProductData.variants.find((variant) =>
      this.#uiGeneratedOptions.every((optionDef) => {
        if (!optionDef.name || typeof optionDef.position !== 'number') return true;
        const optionKey = `option${optionDef.position}`;
        return (
          selectedUIOpts[optionKey] === undefined ||
          variant[optionKey] === selectedUIOpts[optionKey]
        );
      })
    );
  }

  #simpleFormatMoney(centsInput) {
    if (typeof centsInput !== 'number' && typeof centsInput !== 'string') return '';
    const cents = parseInt(String(centsInput).replace(/\D/g, ''), 10);
    if (isNaN(cents)) return '';
    const lang = document.documentElement.lang || 'nb-NO';
    const currencyCode =
      this.#shopifyProductData?.variants?.[0]?.presentment_prices?.[0]?.price.currency_code ||
      'NOK';
    try {
      return (cents / 100).toLocaleString(lang, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    } catch (e) {
      return `${(cents / 100).toFixed(0)} ${currencyCode}`;
    }
  }

  #updateDOMContent(selector, newHtmlContent, isTextContent = false) {
    const element = this.#sectionElement.querySelector(selector);
    if (element) {
      if (newHtmlContent !== undefined && newHtmlContent !== null) {
        if (isTextContent) {
          element.textContent = newHtmlContent;
        } else {
          element.innerHTML = newHtmlContent;
        }
        element.classList.remove('hidden');
      } else {
        element.innerHTML = '';
        element.classList.add('hidden');
      }
    }
  }

  #updateUI(shopifyVariant) {
    const targetShopifyVariant =
      shopifyVariant ||
      this.#shopifyProductData.selected_or_first_available_variant ||
      this.#shopifyProductData.variants?.[0];
    const vaultVariantData = targetShopifyVariant
      ? this.#allVaultVariantData[targetShopifyVariant.id]
      : null;

    if (targetShopifyVariant && vaultVariantData) {
      if (this.#variantIdInput) this.#variantIdInput.value = targetShopifyVariant.id;

      const isOnSale =
        targetShopifyVariant.compare_at_price &&
        targetShopifyVariant.compare_at_price > targetShopifyVariant.price;
      if (this.#priceLabelElement) {
        this.#priceLabelElement.textContent = isOnSale
          ? window.variantStrings?.salePriceLabel || 'Nå'
          : window.variantStrings?.regularPriceLabel || 'Pris';
      }
      if (this.#priceElement) {
        this.#priceElement.textContent = this.#simpleFormatMoney(targetShopifyVariant.price);
      }
      if (this.#comparePriceElement && this.#comparePriceLabelElement) {
        this.#comparePriceElement.innerHTML = isOnSale
          ? `<del>${this.#simpleFormatMoney(targetShopifyVariant.compare_at_price)}</del>`
          : '';
        this.#comparePriceElement.classList.toggle('hidden', !isOnSale);
        this.#comparePriceLabelElement.classList.toggle('hidden', !isOnSale);
      }

      this.#updateImageGallery(vaultVariantData);

      this.#updateDOMContent('[data-variant-subtitle]', vaultVariantData.subtitle?.value, true);
      this.#updateDOMContent(
        '[data-variant-description-container]',
        vaultVariantData.description?.value
      );
      this.#updateDOMContent(
        '[data-variant-materials-container]',
        vaultVariantData.materials?.value
      );
      this.#updateDOMContent(
        '[data-variant-functions-container]',
        vaultVariantData.functions?.value
      );
      this.#updateDOMContent(
        '[data-variant-storage-container]',
        vaultVariantData.storage_and_maintenance?.value
      );

      const relatedProductsContainer = this.#sectionElement.querySelector(
        '[data-variant-related-products-container]'
      );
      if (relatedProductsContainer) {
        relatedProductsContainer.innerHTML = '';
        const relatedProducts = vaultVariantData.related_products?.value;
        if (Array.isArray(relatedProducts) && relatedProducts.length > 0) {
          let html =
            '<h3>Flere som er klare for eventyr..</h3><div class="related-productz-grid my-8 grid grid-cols-2 font-body-family gap-x-2 justify-center aspect-video size-full">';
          relatedProducts.forEach((rp) => {
            html += `<div class="related-productz-card justify-center" role="listitem"><a href="${rp.url || '#'}">`;
            if (rp.featured_image?.url_115x) {
              html += `<img src="${rp.featured_image.url_115x}" alt="${this.#escapeHtml(rp.title)}" style="aspect-ratio: 3/4; display: flex; justify-self: center; place-self: center; border-radius: 12px; margin: 0 auto; width: 115px;">`;
            }
            html += `<h5 class="related-producz-title mt-6 text-2xl items-center justify-center font-body-family text-pri-black">${this.#escapeHtml(rp.title)}</h5>`;
            html += `<h5 class="related-productz-price font-body-family prose prose-lg text-pri-black">${this.#simpleFormatMoney(rp.price)}</h5></a></div>`;
          });
          html += '</div>';
          relatedProductsContainer.innerHTML = html;
        }
      }
      if (vaultVariantData.description?.value) {
        this.#setupTruncatedText(
          '[data-variant-description-container]',
          '.description-content',
          '.description-toggle-button'
        );
      }
    } else {
      if (this.#priceLabelElement)
        this.#priceLabelElement.textContent = window.variantStrings?.unavailable || 'Pris';
      if (this.#priceElement)
        this.#priceElement.textContent = window.variantStrings?.unavailable || 'Utilgjengelig';
      if (this.#comparePriceElement) this.#comparePriceElement.classList.add('hidden');
      if (this.#comparePriceLabelElement) this.#comparePriceLabelElement.classList.add('hidden');
      this.#updateImageGallery(null);
      this.#updateDOMContent('[data-variant-subtitle]', 'Produktinformasjon utilgjengelig', true);
      [
        '[data-variant-description-container]',
        '[data-variant-materials-container]',
        '[data-variant-functions-container]',
        '[data-variant-storage-container]',
        '[data-variant-related-products-container]',
      ].forEach((sel) => this.#updateDOMContent(sel, ''));
    }

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
  }

  #escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') return '';
    return unsafe.replace(
      /[&<>"']/g,
      (match) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[match]
    );
  }

  #onOptionChanged() {
    if (!this.#shopifyProductData) return;
    const selectedOpts = this.#getSelectedShopifyOptions();
    const shopifyVariant = this.#findShopifyVariant(selectedOpts);
    this.#updateUI(shopifyVariant);
    if (shopifyVariant?.id && typeof window.history.replaceState === 'function') {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('variant', String(shopifyVariant.id));
      window.history.replaceState({ path: currentUrl.href }, '', currentUrl.href);
    }
  }

  #initializeOptions() {
    if (!this.#shopifyProductData?.variants?.length) {
      this.#onOptionChangedDebounced();
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const variantIdFromUrl = urlParams.get('variant');
    let initialShopifyVariant =
      this.#shopifyProductData.variants.find((v) => String(v.id) === variantIdFromUrl) ||
      this.#shopifyProductData.selected_or_first_available_variant ||
      this.#shopifyProductData.variants.find((v) => v.available) ||
      this.#shopifyProductData.variants[0];

    if (initialShopifyVariant && Array.isArray(this.#uiGeneratedOptions)) {
      this.#uiGeneratedOptions.forEach((uiOptionDef) => {
        if (!uiOptionDef.name || typeof uiOptionDef.position !== 'number') return;
        const optionKey = `option${uiOptionDef.position}`;
        const valueToSelect = initialShopifyVariant[optionKey];
        if (valueToSelect !== undefined && valueToSelect !== null) {
          const escapedName = this.#escapeCSSSelector(uiOptionDef.name);
          const escapedValue = this.#escapeCSSSelector(String(valueToSelect));
          try {
            const radio = this.#productForm.querySelector(
              `.product-option-input[name="options[${escapedName}]"][value="${escapedValue}"]`
            );
            if (radio instanceof HTMLInputElement) radio.checked = true;
          } catch (e) {
            /* Ignorer */
          }
        }
      });
    }
    this.#onOptionChangedDebounced();
  }

  #getPlainText(htmlStr) {
    if (!htmlStr) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlStr;
    return tempDiv.textContent || '';
  }

  #setupExpandableContent(
    containerSelector,
    contentSelector,
    toggleSelectorAttribute = 'data-metafield-toggle-trigger'
  ) {
    this.#sectionElement.querySelectorAll(containerSelector).forEach((container) => {
      const headerEl = container.querySelector(`[${toggleSelectorAttribute}]`);
      const contentEl = container.querySelector(contentSelector);
      const caretEl = headerEl?.querySelector('.icon-caret, .icon-chevron');
      if (!headerEl || !contentEl) return;

      const fullText = contentEl.dataset.fullText?.trim();
      if (!fullText) {
        contentEl.style.display = 'none';
        if (headerEl) headerEl.style.display = 'none';
        return;
      }
      let isExpanded = false;
      contentEl.innerHTML = '';
      contentEl.style.display = 'none';
      headerEl.setAttribute('aria-expanded', 'false');
      caretEl?.classList.remove('open');
      const update = () => {
        contentEl.innerHTML = isExpanded ? fullText : '';
        contentEl.style.display = isExpanded ? 'block' : 'none';
        headerEl.setAttribute('aria-expanded', String(isExpanded));
        caretEl?.classList.toggle('open', isExpanded);
      };
      headerEl.addEventListener('click', () => {
        isExpanded = !isExpanded;
        update();
      });
    });
  }

  #setupTruncatedText(
    containerSelector,
    contentSelector,
    buttonSelector,
    defaultLengthAttr = 'data-short-text-length',
    defaultLength = 150
  ) {
    const container = this.#sectionElement.querySelector(containerSelector);
    if (!container) return;

    const contentEl = container.querySelector(contentSelector);
    const buttonEl = container.querySelector(buttonSelector);
    const buttonTopEl = container.querySelector('.description-toggle-button-top');

    if (!contentEl || !buttonEl) return;

    const fullHtml = contentEl.innerHTML.trim();

    if (!fullHtml) {
      buttonEl.style.display = 'none';
      if (buttonTopEl) buttonTopEl.style.display = 'none';
      return;
    }
    const shortLength = parseInt(
      contentEl.getAttribute(defaultLengthAttr) || String(defaultLength),
      10
    );
    const plainText = this.#getPlainText(fullHtml);

    if (plainText.length <= shortLength) {
      buttonEl.style.display = 'none';
      if (buttonTopEl) buttonTopEl.style.display = 'none';
      return;
    } else {
      buttonEl.style.display = '';
    }

    let truncatedHtml = '';
    if (plainText.length > shortLength) {
      let cutText = plainText.substring(0, shortLength);
      const lastSpace = cutText.lastIndexOf(' ');
      if (lastSpace > 0 && cutText.length - lastSpace < 25) {
        cutText = cutText.substring(0, lastSpace);
      }
      truncatedHtml = this.#escapeHtml(cutText) + '...';
    } else {
      truncatedHtml = fullHtml;
    }

    let isExpanded = false;
    const updateState = () => {
      contentEl.innerHTML = isExpanded ? fullText : truncatedHtml;
      const buttonTextKey = isExpanded ? 'read_less' : 'read_more';
      const buttonText =
        window.accessibilityStrings?.[buttonTextKey] || (isExpanded ? 'Les mindre' : 'Les mer');
      buttonEl.textContent = buttonText;
      buttonEl.setAttribute('aria-expanded', String(isExpanded));
      if (buttonTopEl) {
        buttonTopEl.textContent = buttonText;
        buttonTopEl.style.display = isExpanded ? 'block' : 'none';
        buttonTopEl.setAttribute('aria-expanded', String(isExpanded));
      }
    };

    contentEl.innerHTML = truncatedHtml;
    buttonEl.textContent = window.accessibilityStrings?.read_more || 'Les mer';
    buttonEl.setAttribute('aria-expanded', 'false');
    if (buttonTopEl) buttonTopEl.style.display = 'none';

    const contentId =
      contentEl.id ||
      `truncated-${this.#sectionElement.dataset.sectionId}-${Math.random().toString(36).slice(2, 7)}`;
    contentEl.id = contentId;
    [buttonEl, buttonTopEl].forEach((btn) => btn?.setAttribute('aria-controls', contentId));

    const newButtonEl = buttonEl.cloneNode(true);
    buttonEl.parentNode.replaceChild(newButtonEl, buttonEl);
    const newButtonTopEl = buttonTopEl ? buttonTopEl.cloneNode(true) : null;
    if (buttonTopEl && newButtonTopEl)
      buttonTopEl.parentNode.replaceChild(newButtonTopEl, buttonTopEl);

    const toggleExpansion = (e) => {
      e.preventDefault();
      isExpanded = !isExpanded;
      updateState();
    };
    newButtonEl.addEventListener('click', toggleExpansion);
    newButtonTopEl?.addEventListener('click', toggleExpansion);
  }

  #initQuantitySelectors() {
    this.#sectionElement.querySelectorAll('.quantity-block').forEach((container) => {
      const decBtn = container.querySelector('.quantity-decrease');
      const incBtn = container.querySelector('.quantity-increase');
      const input = container.querySelector('input[name="quantity"]');
      const pulse = () => {
        input.classList.add('animate-pulse');
        setTimeout(() => input.classList.remove('animate-pulse'), 300);
      };

      if (!decBtn || !incBtn || !input || !(input instanceof HTMLInputElement)) return;

      const min = parseInt(input.min, 10) || 1;
      const max = parseInt(input.dataset.maxQuantity || input.max, 10) || Infinity;

      const updateAvailability = () => {
        const currentVal = parseInt(input.value, 10);
        decBtn.disabled = isNaN(currentVal) || currentVal <= min;
        incBtn.disabled = isNaN(currentVal) || currentVal >= max;
      };

      const changeQuantity = (amount) => {
        let currentValue = parseInt(input.value, 10);
        currentValue = isNaN(currentValue) || currentValue < min ? min : currentValue;
        let newValue = currentValue + amount;
        newValue = Math.max(min, newValue);
        newValue = Math.min(max, newValue);
        if (String(input.value) !== String(newValue)) {
          input.value = String(newValue);
          pulse(); // legg til denne
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
        updateAvailability();
      };

      decBtn.addEventListener('click', (e) => {
        e.preventDefault();
        changeQuantity(-1);
      });

      incBtn.addEventListener('click', (e) => {
        e.preventDefault();
        changeQuantity(1);
      });

      input.addEventListener('change', () => {
        let val = parseInt(input.value, 10);
        if (isNaN(val) || val < min) input.value = String(min);
        else if (val > max) input.value = String(max);
        updateAvailability();
      });

      updateAvailability();
    });
  }

  init() {
    this.#onOptionChangedDebounced = this.#debounce(() => this.#onOptionChanged(), 200);

    const optionInputs = this.#productForm.querySelectorAll('.product-option-input');
    if (optionInputs.length > 0 && this.#uiGeneratedOptions.length > 0) {
      optionInputs.forEach((input) => {
        const nameAttr = input.getAttribute('name');
        if (
          nameAttr &&
          this.#uiGeneratedOptions.some(
            (opt) => opt.name && nameAttr === `options[${this.#escapeCSSSelector(opt.name)}]`
          )
        ) {
          input.addEventListener('change', () => this.#onOptionChangedDebounced());
        }
      });
    }

    const checkoutBtn = this.#sectionElement.querySelector('#direct-to-checkout-btn');
    const quantityInput = this.#sectionElement.querySelector('input[name="quantity"]');

    if (checkoutBtn && quantityInput && this.#variantIdInput) {
      checkoutBtn.addEventListener('click', () => {
        const variantId = this.#variantIdInput.value;
        const quantity = parseInt(quantityInput.value, 10) || 1;

        if (variantId && quantity > 0) {
          const url = new URL('/checkout', window.location.origin);
          url.searchParams.set('variants', `${variantId}:${quantity}`);
          window.location.href = url.toString();
        }
      });
    }

    this.#initializeOptions();
    this.#setupExpandableContent('.expandable-metafield', '.metafield-content');
    this.#initQuantitySelectors();

    // === Initielt last inn første variantbilder hvis tilgjengelig ===

if (typeof ProductPreviewHandler !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document
      .querySelectorAll('.product-preview-section[data-section-id]')
      .forEach((sectionNode) => {
        if (
          sectionNode instanceof HTMLElement &&
          (sectionNode.dataset.productJson ||
            sectionNode.querySelector('script[data-product-json-script]'))
        ) {
          try {
            new ProductPreviewHandler(sectionNode);
          } catch (e) {
            console.error(
              `Error initializing ProductPreviewHandler for section ${sectionNode.dataset.sectionId}:`,
              e
            );
          }
        }
      });
  });
}
