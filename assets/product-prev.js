class ProductPreviewHandler {
  constructor(sectionElement) {
    this.sectionElement = sectionElement;
    if (!this.sectionElement) {
      return;
    }

    try {
      this.shopMoneyFormat = JSON.parse(this.sectionElement.dataset.moneyFormat || '{}');

      console.log('[DEBUG] RÅ data-product-json FØR PARSING:', this.sectionElement.dataset.productJson);
      this.fullProductData = JSON.parse(this.sectionElement.dataset.productJson || '{}');
      console.log('[DEBUG] this.fullProductData ETTER PARSING (dette bør være et fullt produktobjekt):', JSON.parse(JSON.stringify(this.fullProductData)));

      if (!this.fullProductData || typeof this.fullProductData !== 'object' || Object.keys(this.fullProductData).length === 0) {
        console.warn(`ProductPreviewHandler [${this.sectionId}]: Product data is empty or invalid (etter parsing, før kopiering).`);
        this.productData = null;
        return;
      }

      this.productData = JSON.parse(JSON.stringify(this.fullProductData));

      if (this.productData.options && Array.isArray(this.productData.options)) {
        console.log(`[DEBUG] productData.options FØR filtrering for section ${this.sectionId}:`, JSON.parse(JSON.stringify(this.productData.options))); // Logg hele arrayen

        this.productData.options = this.productData.options.filter(
          (option, index) => {
            console.log(`[DEBUG] Sjekker opsjon på indeks ${index} for section ${this.sectionId}:`, option); // Logg hvert individuelle opsjonsobjekt

            // DEN VIKTIGE SIKKERHETSSJEKKEN:
            if (option && typeof option.name === 'string') {
              console.log(`[DEBUG] Opsjon ${index} har gyldig navn: "${option.name}"`);
              return option.name.toLowerCase() !== 'farge'; // ENDRE 'farge' HVIS NØDVENDIG
            } else {
              console.warn(`[DEBUG] PROBLEM! Opsjon på indeks ${index} for section ${this.sectionId} mangler 'name' eller er ikke en streng. Opsjonsdata:`, option);
              return false; // Fjerner denne ugyldige opsjonen fra UI-listen
            }
          }
        );
        console.log(`[DEBUG] productData.options ETTER filtrering for section ${this.sectionId}:`, JSON.parse(JSON.stringify(this.productData.options)));
      } else {
        console.log(`[DEBUG] Ingen 'options'-array å filtrere for section ${this.sectionId}, eller den er ikke en array.`);
      }

    } catch (e) {
      console.error(`ProductPreviewHandler [${this.sectionId}]: FEIL under initialisering av produktdata.`, e);
      if (e instanceof SyntaxError) { // Spesifikt for JSON.parse feil
        console.error(`ProductPreviewHandler [${this.sectionId}]: Rå data-product-json som feilet parsing:`, this.sectionElement.dataset.productJson);
      }
      this.productData = null;
      return;
    }


    this.sectionId = this.sectionElement.dataset.sectionId;
    this.productFormId = this.sectionElement.dataset.productFormId;

    try {
      this.shopMoneyFormat = JSON.parse(this.sectionElement.dataset.moneyFormat || '{}');
      // Behold original productData for variant-matching, men lag en UI-spesifikk versjon av options
      this.fullProductData = JSON.parse(this.sectionElement.dataset.productJson || '{}');
      if (!this.fullProductData || typeof this.fullProductData !== 'object' || Object.keys(this.fullProductData).length === 0) {
        console.warn('Product data is empty or invalid.');
        this.productData = null; // Sett productData til null for å stoppe videre behandling
        return;
      }

      // Lag en kopi av produktdata som skal brukes av UI-logikken
      this.productData = JSON.parse(JSON.stringify(this.fullProductData));

      // Filtrer this.productData.options til kun å inneholde de opsjonene som har UI
      // (dvs. de som IKKE er "Farge", eller det faktiske navnet på fargeopsjonen din)
      if (this.productData.options) {
        this.productData.options = this.productData.options.filter(
          option => option.name.toLowerCase() !== 'farge' // ENDRE 'farge' HVIS DIN OPSJON HETER NOE ANNET
        );
      }
      // console.log('UI Product Options (after filtering):', this.productData.options);

    } catch (e) {
      console.error('Error parsing productData:', e);
      this.productData = null;
      return;
    }

    // Fortsett kun hvis this.productData (etter mulig filtrering) er gyldig
    if (!this.productData || !this.productData.variants) { // Sjekk også for variants
      console.warn('Product data (possibly filtered) is missing or incomplete.');
      return;
    }

    this.productForm = this.sectionElement.querySelector(`#${this.productFormId}`);
    if (!this.productForm) {
      return;
    }

    this.variantIdInput = this.productForm.querySelector('input[name="id"]');
    this.addToCartButton = this.productForm.querySelector('.add-to-cart-btn');
    this.priceElement = this.sectionElement.querySelector('[data-product-price]');
    this.comparePriceElement = this.sectionElement.querySelector('[data-compare-price]');
    this.comparePriceLabelElement = this.sectionElement.querySelector('[data-compare-price-label]');

    // currentSelectedOptions vil nå kun inneholde de UI-aktive opsjonene (f.eks. størrelse)
    this.currentSelectedOptions = {};

    this.init();
  }

  escapeCSSSelector(str) {
    if (typeof str !== 'string') return '';
    // Enkel escaping, kan forbedres hvis nødvendig
    return str.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, '\\$1');
  }

  getSelectedOptions() {
    const selected = {};
    // Bruk this.productData.options som er filtrert for UI
    if (!this.productData.options || this.productData.options.length === 0) {
      // Hvis det ikke er noen UI-opsjoner (f.eks. produkt uten varianter etter filtrering),
      // returner tom, eller håndter som et produkt uten opsjoner.
      return selected;
    }

    this.productData.options.forEach((optionDef) => {
      const optionKey = `option${optionDef.position}`;
      const escapedOptionName = this.escapeCSSSelector(optionDef.name);
      const selector = `.product-option-input[name="options[${escapedOptionName}]"]:checked`;
      const checkedRadio = this.productForm.querySelector(selector);

      if (checkedRadio) {
        selected[optionKey] = checkedRadio.value;
      } else {
        // Fallback hvis ingen er valgt for en UI-opsjon (bør ikke skje med radio, men greit å ha)
        // Dette kan trenge justering basert på ønsket default-oppførsel
        const fallbackVariant = this.fullProductData.selected_or_first_available_variant || (this.fullProductData.variants ? this.fullProductData.variants[0] : null);
        if (fallbackVariant && fallbackVariant[optionKey]) {
          selected[optionKey] = fallbackVariant[optionKey];
        }
      }
    });
    // console.log('Selected UI Options:', selected);
    return selected;
  }

  findVariant(selectedUIOpts) {
    // Bruk this.fullProductData.variants for å søke, da disse inneholder alle opsjonsverdier (inkl. farge)
    if (!this.fullProductData.variants || this.fullProductData.variants.length === 0) return null;

    // selectedUIOpts inneholder kun de valgene brukeren har gjort (f.eks. størrelse: { option1: 'M' })
    // Vi må finne en variant som matcher disse UI-valgene, og for eventuelle
    // "manglende" opsjoner (som farge), tar vi den første som passer.

    const matchingVariants = this.fullProductData.variants.filter(variant => {
      // Sjekk om varianten matcher alle de valgte UI-opsjonene
      let matchesAllUIOptions = true;
      for (const uiOptionKey in selectedUIOpts) { // f.eks. uiOptionKey = 'option1'
        if (variant[uiOptionKey] !== selectedUIOpts[uiOptionKey]) {
          matchesAllUIOptions = false;
          break;
        }
      }
      return matchesAllUIOptions;
    });

    if (matchingVariants.length > 0) {
      // Hvis det er flere treff (f.eks. Størrelse M i Rød, Størrelse M i Blå)
      // Velg den første tilgjengelige, eller bare den første
      let bestMatch = matchingVariants.find(v => v.available);
      // console.log('Found variant:', bestMatch || matchingVariants[0]);
      return bestMatch || matchingVariants[0];
    }
    // console.log('No variant found for:', selectedUIOpts);
    return null;
  }

  // ... simpleFormatMoney (uendret) ...
  simpleFormatMoney(centsInput, format) {
    let cents = centsInput;
    if (typeof cents === 'string') {
      const cleaned = cents.replace(/[^\d,.-]/g, '').replace(',', '.');
      cents = Math.round(parseFloat(cleaned) * 100);
    }
    if (typeof cents !== 'number' || isNaN(cents)) cents = 0;

    let value = (cents / 100.0).toFixed(2);
    const placeholderRegex = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/;
    let placeholder = '{{amount}}';
    const match = format.match(placeholderRegex);
    if (match && match[0]) placeholder = match[0];

    if (placeholder.includes('no_decimals')) value = (cents / 100.0).toFixed(0);

    if (format.includes(',') && format.indexOf(',') < format.indexOf('.')) {
      value = value.replace('.', '#TEMP#').replace(/(\d)(?=(\d{3})+(?!\d#TEMP#))/g, '$1.').replace('#TEMP#', ',');
    } else if (format.includes('.') && (!format.includes(',') || format.indexOf('.') < format.indexOf(','))) {
      value = value.replace(/(\d)(?=(\d{3})+(?!\d\.))/g, '$1,');
    }
    return format.replace(placeholderRegex, value);
  }


  updateUI(variant) {
    // Bruk this.fullProductData for fallback om ingen variant er funnet
    const fallbackInitialVariant = this.fullProductData.selected_or_first_available_variant ||
      (this.fullProductData.variants ? this.fullProductData.variants.find(v => v.available) || this.fullProductData.variants[0] : null);

    const targetVariant = variant || fallbackInitialVariant;

    if (targetVariant) {
      if (this.variantIdInput) this.variantIdInput.value = targetVariant.id;
      if (this.priceElement) this.priceElement.textContent = this.simpleFormatMoney(targetVariant.price, this.shopMoneyFormat);

      if (this.comparePriceElement && this.comparePriceLabelElement) {
        if (targetVariant.compare_at_price && targetVariant.compare_at_price > targetVariant.price) {
          this.comparePriceElement.textContent = this.simpleFormatMoney(targetVariant.compare_at_price, this.shopMoneyFormat);
          this.comparePriceElement.classList.remove('hidden');
          this.comparePriceLabelElement.classList.remove('hidden');
        } else {
          this.comparePriceElement.textContent = '';
          this.comparePriceElement.classList.add('hidden');
          this.comparePriceLabelElement.classList.add('hidden');
        }
      }
    } else {
      if (this.priceElement) this.priceElement.textContent = 'N/A';
      if (this.comparePriceElement) this.comparePriceElement.classList.add('hidden');
      if (this.comparePriceLabelElement) this.comparePriceLabelElement.classList.add('hidden');
    }

    if (this.addToCartButton) {
      if (targetVariant && targetVariant.available) {
        this.addToCartButton.disabled = false;
        this.addToCartButton.textContent = 'Legg i Handlekurv';
      } else if (targetVariant && !targetVariant.available) {
        this.addToCartButton.disabled = true;
        this.addToCartButton.textContent = 'Utsolgt';
      } else { // Ingen targetVariant i det hele tatt
        this.addToCartButton.disabled = true;
        this.addToCartButton.textContent = 'Utilgjengelig';
      }
    }
  }

  onOptionChanged() {
    // Bruk this.productData.options (filtrert for UI) for å sjekke om det er noen opsjoner å hente
    if (!this.productData.options || this.productData.options.length === 0) {
      // Hvis ingen UI-opsjoner, oppdater UI med default/første variant fra fullProductData
      const initialVariant = this.fullProductData.selected_or_first_available_variant ||
        (this.fullProductData.variants && this.fullProductData.variants.length > 0 ? this.fullProductData.variants[0] : null);
      this.updateUI(initialVariant);
      return;
    }
    this.currentSelectedOptions = this.getSelectedOptions(); // Henter kun UI-opsjoner
    const variant = this.findVariant(this.currentSelectedOptions); // Finner variant basert på UI-opsjoner
    this.updateUI(variant);

    if (variant && history.replaceState) {
      const newUrl = `${window.location.pathname}?variant=${variant.id}${window.location.hash}`;
      window.history.replaceState({ path: newUrl }, '', newUrl);
    }
  }

  initializeOptions() {
    // Bruk this.productData.options (filtrert for UI) for å bestemme om vi skal initialisere opsjoner
    if (!this.productData.options || this.productData.options.length === 0) {
      const initialVariant = this.fullProductData.selected_or_first_available_variant ||
        (this.fullProductData.variants && this.fullProductData.variants.length > 0 ? this.fullProductData.variants[0] : null);
      this.updateUI(initialVariant);
      if (this.variantIdInput && initialVariant) {
        this.variantIdInput.value = initialVariant.id;
      }
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const variantIdFromUrl = urlParams.get('variant');
    let initialVariantToSelect = null;

    if (variantIdFromUrl) {
      initialVariantToSelect = this.fullProductData.variants.find(v => String(v.id) === variantIdFromUrl);
    }

    // Hvis ikke fra URL, bruk default fra fullProductData
    initialVariantToSelect = initialVariantToSelect || this.fullProductData.selected_or_first_available_variant || this.fullProductData.variants.find(v => v.available) || (this.fullProductData.variants ? this.fullProductData.variants[0] : null);

    if (initialVariantToSelect) {
      // Iterer KUN over UI-opsjonene (this.productData.options) for å sette checked state
      this.productData.options.forEach((uiOptionDef) => {
        const optionKey = `option${uiOptionDef.position}`; // f.eks. 'option1' for Størrelse
        const optionValueToSelect = initialVariantToSelect[optionKey]; // Hent verdien fra den fulle varianten

        if (optionValueToSelect) {
          const escapedOptionName = this.escapeCSSSelector(uiOptionDef.name);
          // For value i selector, bruk String() og escape anførselstegn
          const escapedValueForSelector = this.escapeCSSSelector(String(optionValueToSelect).replace(/"/g, '\\"'));
          const radioSelector = `.product-option-input[name="options[${escapedOptionName}]"][value="${escapedValueForSelector}"]`;
          const radio = this.productForm.querySelector(radioSelector);
          if (radio) {
            radio.checked = true;
            // console.log(`Initialized ${uiOptionDef.name} to ${optionValueToSelect}`);
          } else {
            // console.warn(`Radio not found for init: ${radioSelector}`);
          }
        }
      });
    }
    // Kall onOptionChanged for å sikre at UI oppdateres basert på initielle valg (eller mangel på sådan)
    this.onOptionChanged();
  }

  // ... setupExpandableText (uendret) ...
  setupExpandableText(containerSelector, contentSelector, buttonSelector, defaultLength) {
    this.sectionElement.querySelectorAll(containerSelector).forEach(container => {
      const contentEl = container.querySelector(contentSelector);
      const buttonEl = container.querySelector(buttonSelector);
      if (!contentEl || !buttonEl) return;

      const fullText = contentEl.dataset.fullText;
      const shortLength = parseInt(contentEl.dataset.shortTextLength, 10) || defaultLength;

      if (!fullText || fullText.length <= shortLength) {
        if (fullText) contentEl.innerHTML = fullText; // Sett innerHTML selv om det er kort, for å prosessere <br> etc.
        buttonEl.style.display = 'none';
        return;
      }
      let isExpanded = false;
      const shortText = fullText.substring(0, shortLength) + (fullText.length > shortLength ? '...' : ''); // Sjekk om ... trengs

      const update = () => {
        contentEl.innerHTML = isExpanded ? fullText : shortText;
        buttonEl.textContent = isExpanded ? 'Les mindre' : 'Les mer';
        if (buttonEl.hasAttribute('aria-expanded')) buttonEl.setAttribute('aria-expanded', isExpanded);
      };
      update();
      buttonEl.addEventListener('click', () => {
        isExpanded = !isExpanded;
        update();
      });
    });
  }
  // ... initQuantitySelectors (uendret) ...
  initQuantitySelectors() {
    this.sectionElement.querySelectorAll('.quantity-selector').forEach(container => {
      const decBtn = container.querySelector('.quantity-decrease');
      const incBtn = container.querySelector('.quantity-increase');
      const input = container.querySelector('.quantity-input');
      if (!decBtn || !incBtn || !input) return;
      const min = parseInt(input.min, 10) || 1;
      const updateBtns = () => { decBtn.disabled = parseInt(input.value, 10) <= min; };
      decBtn.addEventListener('click', () => { if (parseInt(input.value, 10) > min) input.value = parseInt(input.value, 10) - 1; input.dispatchEvent(new Event('change', { bubbles: true })); updateBtns(); });
      incBtn.addEventListener('click', () => { input.value = parseInt(input.value, 10) + 1; input.dispatchEvent(new Event('change', { bubbles: true })); updateBtns(); });
      input.addEventListener('change', () => { if (isNaN(parseInt(input.value, 10)) || parseInt(input.value, 10) < min) input.value = min; updateBtns(); });
      updateBtns();
    });
  }


  init() {
    if (!this.productForm || !this.productData) { // Sjekk this.productData her også
      console.warn('Product form or product data not available for init.');
      // Skjul eller vis en feilmelding for brukeren om nødvendig
      // For eksempel, hvis det er et problem med produktdata, skjul hele opsjonsområdet.
      const optionsColumn = this.sectionElement.querySelector('.options-column-content');
      if (optionsColumn) {
        // optionsColumn.innerHTML = '<p>Beklager, produktinformasjon er utilgjengelig.</p>';
      }
      return;
    }

    // Lytt KUN til endringer på de UI-aktive opsjonsinputene
    const optionInputs = this.productForm.querySelectorAll('.product-option-input');
    if (optionInputs.length > 0) {
      optionInputs.forEach(input => {
        // Sjekk om input name korresponderer med en UI-opsjon
        // Dette er en ekstra sjekk, men bør ikke være nødvendig hvis HTML kun rendrer UI-opsjoner
        const inputOptionNameRaw = input.name.match(/options\[(.*?)\]/);
        if (inputOptionNameRaw && inputOptionNameRaw[1]) {
          const inputOptionName = inputOptionNameRaw[1];
          if (this.productData.options.some(uiOpt => this.escapeCSSSelector(uiOpt.name) === inputOptionName)) {
            input.addEventListener('change', () => this.onOptionChanged());
          }
        }
      });
    }

    this.initializeOptions();
    this.setupExpandableText('.expandable-metafield', '.metafield-content', '.metafield-toggle-button', 80);
    this.setupExpandableText('.product-description-container', '.description-content', '.description-toggle-button', 180);
    this.initQuantitySelectors();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sectionsToInit = document.querySelectorAll('.product-preview-section[data-section-id]');
  sectionsToInit.forEach(sectionEl => {
    new ProductPreviewHandler(sectionEl);
  });
});
