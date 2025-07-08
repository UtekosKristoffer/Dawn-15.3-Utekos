//@ts-nocheck
import debounce from 'lodash-es/debounce';
import { subscribe, publish } from '../lib/pubsub.js'; // Antatt plassering
import { initializeSwipers } from './initializeSwipers.js';
if (!customElements.get('product-preview-handler')) {
    customElements.define(
        'product-preview-handler',
        class ProductPreviewHandler extends HTMLElement {
            #productData = null;
            #variantsMap = null;
            #variantIdInput = null;
            #addToCartButton = null;
            #onOptionChange = null;
            #deliveryOptions = null;
            #clickAndCollectPopup = null;
            #clickAndCollectCloseButton = null;
            #onOptionValueChangeDebounced = null;
            #updateUrl = undefined = null; 
            onVariantChangeUnsubscriber = undefined;
            cartUpdateUnsubscriber = undefined;
            quantityInput = undefined;
            quantityForm = undefined;
            onVariantChangeUnsubscriber = undefined;
            cartUpdateUnsubscriber = undefined;
            abortController = undefined;
            pendingRequestUrl = null;
            preProcessHtmlCallbacks = [];
            postProcessHtmlCallbacks = [];

            constructor() {
                super();
            }

            connectedCallback() {
                this.initializeProductSwapUtility();
                this.updateSwiper(initializeSwipers);

                this.onVariantChangeUnsubscriber = subscribe(
                    PUB_SUB_EVENTS.optionValueSelectionChange,
                    this.handleOptionValueChange.bind(this)
                );

                try {
                    this.#loadData();
                    this.#cacheDOMElements();
                    this.#initializeTool();
                    this.#attachEventListeners();
                    this.#initializeUI();
                    this.#initializeProductSwapUtility();
                    this.#resetProductFormState();
                    this.#removeEventListeners();
                    this.onVariantChangeUnsubscriber();
                    this.cartUpdateUnsubscriber?.();
                } catch (error) {
                    console.error('Feil under initialisering av <preview-handler>:', error);
                    this.classList.add('is-error');
                }
            }

            #initializeTools() {
                this.#onOptionChangedDebounced = debounce(this.#onOptionChange.bind(this), 300);
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
                    console.warn('Advarsel: Fant ikke #delivery-method-options.');
                }

                this.#clickAndCollectPopup = this.querySelector('#click-and-collect');
                if (!this.#clickAndCollectPopup) {
                    console.warn('Advarsel: Fant ikke #click-and-collect.');
                }
            }

            #attachEventListeners() {

                this.#productForm.addEventListener('change', this.#onOptionChangedDebounced);

                if (this.#deliveryOptions) {
                    this.#deliveryOptions.addEventListener('click', this.#handleDeliveryOptionClick.bind(this));
                }

                if (this.#clickAndCollectCloseButton) {
                    this.#clickAndCollectCloseButton.addEventListener('click', this.#closeClickCollectPopup.bind(this));
                }


                this.initQuantityHandlers();
                this.dispatchEvent(new CustomEvent('product-preview-handler:loaded', { bubbles: true }));
            }

            addPreProcessCallback(callback) {
                this.preProcessHtmlCallbacks.push(callback);
            }

            initQuantityHandlers() {
                if (!this.quantityInput) return;
                this.quantityForm = this.querySelector('.product-form__quantity');
                if (!this.quantityForm) return;
            }

            disconnectedCallback() {
                this.onVariantChangeUnsubscriber();
                this.cartUpdateUnsubscriber?.();
            }

            initializeProductSwapUtility() {
                this.preProcessHtmlCallbacks.push((html) =>
                    html
                        .querySelectorAll('.scroll-trigger')
                        .forEach((element) => element.classList.add('scroll-trigger--cancel'))
                );
                this.postProcessHtmlCallbacks.push((newNode) => {
                    window?.Shopify?.PaymentButton?.init();
                    window?.ProductModel?.loadShopifyXR();
                });


            }

           #initializeUI({ data: { event, target, selectedOptionValues } }) {
                if (!this.contains(event.target)) return;

                this.#resetProductFormState();
                this.#removeEventListeners();

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

                this.#onOptionChange();
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

            #resetProductFormState() {
                const productForm = this.productForm;
                productForm?.toggleSubmitButton(true);
                productForm?.handleErrorMessage();
            }

            handleSwapProduct(productUrl, updateFullPage) {
                return (html) => {
                    this.productModal?.remove();

                    const selector = updateFullPage ? "product-preview-handler[id^='ProductPreviewHandler']" : 'product-preview-handler';
                    const variant = this.getSelectedVariant(html.querySelector(selector));
                    this.#updateURL(productUrl, variant?.id);

                    if (updateFullPage) {
                        document.querySelector('head title').innerHTML =
                            html.querySelector('head title').innerHTML;

                        HTMLUpdateUtility.viewTransition(
                            document.querySelector('main'),
                            html.querySelector('main'),
                            this.preProcessHtmlCallbacks,
                            this.postProcessHtmlCallbacks
                        );
                    } else {
                        HTMLUpdateUtility.viewTransition(
                            this,
                            html.querySelector('product-preview-handler'),
                            this.preProcessHtmlCallbacks,
                            this.postProcessHtmlCallbacks
                        );
                    }
                };
            }

            #onOptionChange() {
                // 1. Les de valgte opsjonene fra skjemaet
                const selectedInputs = this.#productForm.querySelectorAll('input[type="radio"]:checked');
                const selectedOptions = Array.from(selectedInputs).map(input => input.value);
                const optionsKey = selectedOptions.join('-');

                // 2. Finn varianten umiddelbart ved hjelp av vårt nye oppslagskart
                const newVariant = this.#optionsToVariantMap.get(optionsKey);

                // 3. Oppdater UI basert på den nye varianten
                if (newVariant) {
                    const variantData = newVariant.shopify_product_data;

                    // Oppdater det skjulte input-feltet med ny variant-ID
                    this.#variantIdInput.value = variantData.id;

                    // Oppdater "legg i kurv"-knappen
                    this.#addToCartButton.disabled = false;
                    this.#addToCartButton.querySelector('label').textContent = window.variantStrings.addToCart || 'Legg i handlekurv';

                    // Oppdater URL
                    this.#updateURL(variantData.id);

                } else {
                    // Håndter ugyldig kombinasjon (f.eks. ikke-eksisterende variant)
                    this.#variantIdInput.value = '';
                    this.#addToCartButton.disabled = true;
                    this.#addToCartButton.querySelector('label').textContent = window.variantStrings.unavailable || 'Utilgjengelig';
                }

            }


            #renderProductPreviewHandler({ requestUrl, targetId, callback }) {
                this.abortController?.abort();
                this.abortController = new AbortController();

                fetch(requestUrl, { signal: this.abortController.signal })
                    .then((response) => response.text())
                    .then((responseText) => {
                        this.pendingRequestUrl = null;
                        const html = new DOMParser().parseFromString(responseText, 'text/html');
                        callback(html);
                    })
                    .then(() => {
                        // set focus to last clicked option value
                        document.querySelector(`#${targetId}`)?.focus();
                    })
                    .catch((error) => {
                        if (error.name === 'AbortError') {
                            console.log('Fetch aborted by user');
                        } else {
                            console.error(error);
                        }
                    });
            }

            getSelectedVariant(ProductPreviewHandlerNode) {
                const selectedVariant = ProductPreviewHandlerNode.querySelector(
                    'product-preview-handler [data-product-configuration]'
                )?.innerHTML;
                return !!selectedVariant ? JSON.parse(selectedVariant) : null;
            }

            buildRequestUrlWithParams(url, optionValues, shouldFetchFullPage = false) {
                const params = [];

                !shouldFetchFullPage && params.push(`section_id=${this.sectionId}`);

                if (optionValues.length) {
                    params.push(`option_values=${optionValues.join(',')}`);
                }

                return `${url}?${params.join('&')}`;
            }

            handleUpdateProductPreviewHandler(productUrl) {
                return (html) => {
                    const variant = this.getSelectedVariant(html);
                    this.#variantData
                    this.pickupAvailability?.update(variant);
                    this.#updateURL(productUrl, variant?.id);
                    this.updateVariantInputs(variant?.id);
                    this.#variantData

                    if (!variant) {
                        this.setUnavailable();
                        return;
                    }

                    this.updateMedia(html, #variantData?.images?.id);

                    const updateSourceFromDestination = (id, shouldHide = (source) => false) => {
                        const source = html.getElementById(`${id}-${this.sectionId}`);
                        const destination = this.querySelector(`#${id}-${this.dataset.section}`);
                        if (source && destination) {
                            destination.innerHTML = source.innerHTML;
                            destination.classList.toggle('hidden', shouldHide(source));
                        }
                    };
                    updateSourceFromDestination('Product-Preview-Swiper');
                    updateSourceFromDestination('price');
                    updateSourceFromDestination('Inventory', ({ innerText }) => innerText === '');
                    updateSourceFromDestination('Price-Per-Item', ({ classList }) =>
                        classList.contains('hidden')
                    );

                    this.productForm?.toggleSubmitButton(
                        html
                            .getElementById(`ProductPreviewSubmitButton-${this.sectionId}`)
                            ?.hasAttribute('disabled') ?? true,
                        window.variantStrings.soldOut
                    );


                    publish(PUB_SUB_EVENTS.variantChange, {
                        data: {
                            sectionId: this.sectionId,
                            variant: newVariant,
                            roduct: this.#productData.product,
                            source: 'product-preview-handler',
                            html,
                        },
                    });
                };
            }

            updateVariantInputs(variantId) {
                this.querySelectorAll(
                    `#product-form-${this.dataset.section}, #product_form_id-${this.dataset.section}`
                ).forEach((productForm) => {
                    const input = productForm.querySelector('input[name="id"]');
                    input.value = variantId ?? '';
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                });
            }

            #updateURL(url, variantId) {
                this.querySelector('share-button')?.updateUrl(
                    `${window.shopUrl}${url}${variantId ? `?variant=${variantId}` : ''}`
                );

                if (this.dataset.updateUrl === 'false') return;
                window.history.replaceState({}, '', `${url}${variantId ? `?variant=${variantId}` : ''}`);
            }
            setUnavailable() {
                this.productForm?.toggleSubmitButton(true, window.variantStrings.unavailable);

                const selectors = [
                    'price',
                    'Inventory',
                    'Price-Per-Item',
                ]
                    .map((id) => `#${id}-${this.dataset.section}`)
                    .join(', ');
                document.querySelectorAll(selectors).forEach(({ classList }) => classList.add('hidden'));
            }

            updateMedia(html, vaultVariantMediaId) {
                initializeSwipers();

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
                return document.querySelector(
                    `product-recommendations[data-section-id^="${relatedProductsSectionId}"]`
                );
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
