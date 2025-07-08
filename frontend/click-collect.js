//@ts-nocheck
document.querySelectorAll('.popup-trigger-button').forEach((button) => {
  if (!(button instanceof HTMLElement)) return; // Sikkerhet først

  button.addEventListener('click', () => {
    const targetPopupId = button.dataset.popupTarget;
    const popupToOpen = document.getElementById(targetPopupId);
    if (popupToOpen) {
      popupToOpen.style.display = 'flex';
      if (targetPopupId === 'ClickCollectPopUp') {
        setTimeout(() => {
          if (ClickCollectInitialized) {
            updateClickCollectSummary();
          } else {
            initializeClickCollectLogicIfNeeded();
          }
        }, 0);
      }
    }
  });
});

document.querySelectorAll('.popup-close-button').forEach((button) => {
  button.addEventListener('click', () => {
    const popupToClose = button.closest('.popup-overlay');
    if (popupToClose instanceof HTMLElement) {
      popupToClose.style.display = 'none';
    }
  });
});

document.querySelectorAll('.popup-overlay').forEach((overlay) => {
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay && overlay instanceof HTMLElement) {
      overlay.style.display = 'none';
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.popup-overlay').forEach((popup) => {
      if (popup instanceof HTMLElement && popup.style.display === 'flex') {
        popup.style.display = 'none';
      }
    });
  }
});

let ClickCollectOptions = [];
let ClickCollectInitialized = false;

/**
 * Formats a number of cents into a localized currency string.
 * @param {number|string} amountInCents - The amount in cents (e.g., 10990 for 109.90 kr).
 * @param {string} currency - ISO 4217 currency code (e.g., 'NOK', 'EUR', 'USD').
 * @param {string} locale - BCP 47 locale string (e.g., 'nb-NO', 'en-US').
 * @returns {string} - Localized currency string, or 'N/A' if input is invalid.
 */
function formatCurrency(amountInCents, currency = 'NOK', locale = 'nb-NO') {
  const cents = typeof amountInCents === 'string' ? parseFloat(amountInCents) : amountInCents;

  if (!Number.isFinite(cents)) return 'N/A';

  const amount = cents / 100;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function getFormattedVariantOptions(optionsWithValues) {
  if (!optionsWithValues || !Array.isArray(optionsWithValues) || optionsWithValues.length === 0) {
    return [];
  }
  const relevantOptions = optionsWithValues.filter(
    (opt) => !(opt.name === 'Title' && opt.value === 'Default Title')
  );
  return relevantOptions.map((opt) => ({ name: opt.name, value: opt.value }));
}

function updateCartCount(count) {
  const cartCountEls = document.querySelectorAll('#cart-icon-bubble, .cart-count');
  const actualCount = Number.isInteger(count) ? count : 0;
  cartCountEls.forEach((el) => {
    el.textContent = actualCount;
  });
}

async function fetchAndUpdateCartCount() {
  try {
    const res = await fetch('/cart.js');
    if (!res.ok)
      throw new Error(`[CartAPI] Nettverksrespons var ikke ok for /cart.js: ${res.status}`);
    const cart = await res.json();
    const countToUse =
      typeof cart.total_quantity === 'number'
        ? cart.total_quantity
        : typeof cart.item_count === 'number'
          ? cart.item_count
          : 0;
    updateCartCount(countToUse);
    return cart;
  } catch (err) {
    console.error('[CartAPI] Feil ved henting av handlekurv for telling:', err);
    updateCartCount('!');
    return null;
  }
}

function createHiddenInput(name, value) {
  if (value === undefined || value === null) return null;
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = typeof value === 'object' ? JSON.stringify(value) : value;
  return input;
}

function updateHiddenInputFields() {
  const formArea = document.getElementById('form_area');
  if (!formArea) return;
  const inputsToRemove = formArea.querySelectorAll('input[name^="contact[click-collect_items]"]');
  console.log('Finner og fjerner følgende input-felter (hvis de finnes):', inputsToRemove);
  inputsToRemove.forEach((input) => input.remove());

  ClickCollectOptions.forEach((item, index) => {
    const createInput = (nameSuffix, value) => {
      if (value === undefined || value === null) return;
      const input = createHiddenInput(
        `contact[click-collect_items][${index}][${nameSuffix}]`,
        value
      );
      if (input) formArea.appendChild(input);
      input.type = 'hidden';
      input.name = `contact[click-collect_items][${index}][${nameSuffix}]`;
      console.log(`Oppretter input med navn: ${input.name}`);
      input.value = typeof value === 'object' ? JSON.stringify(value) : value;
      console.log(
        `Oppretter input med verdi: ${input.value} (stringifisert: ${typeof value === 'object'})`
      );
      formArea.appendChild(input);
    };

    createInput('product_id', item.productId);
    createInput('variant_id', item.variantId);
    createInput('key', item.key);
    createInput('title', item.title);

    const variantStringForForm =
      item.variantOptionsArray && item.variantOptionsArray.length > 0
        ? item.variantOptionsArray.map((opt) => `${opt.name}: ${opt.value}`).join('; ')
        : item.variantTitle;
    createInput('variant_details', variantStringForForm);
    createInput('quantity', item.quantity);
  });
}

function updateClickCollectSummary() {
  const listContainer = document.getElementById('click-collect-summary');
  const itemTemplate = document.getElementById('click-collect-template');

  if (!(listContainer instanceof HTMLElement) || !(itemTemplate instanceof HTMLTemplateElement)) {
    console.error('[KH] Finner ikke listContainer eller itemTemplate!');
    return;
  }

  listContainer.innerHTML = '';

  if (!ClickCollectOptions || ClickCollectOptions.length === 0) {
    listContainer.innerHTML =
      '<p class="text-gray-600 p-4">Ingen produkter tilgjengelig for henting.</p>';
    return;
  }

  ClickCollectOptions.forEach((item) => {
    const clone = itemTemplate.content.cloneNode(true);
    const itemClone = clone instanceof DocumentFragment ? clone.firstElementChild : null;
    if (!(itemClone instanceof HTMLElement)) return;

    // Bilde og link
    const imgLink = itemClone.querySelector('.click-collect-item-image-link');
    const imgElement = itemClone.querySelector('.click-collect-item-image');
    if (
      item.image &&
      imgElement instanceof HTMLImageElement &&
      imgLink instanceof HTMLAnchorElement
    ) {
      imgElement.src = item.image;
      imgElement.alt = item.title || 'Produktbilde';
      imgLink.href = item.url || '#';
    } else if (imgLink instanceof HTMLElement) {
      imgLink.style.display = 'none';
    }

    // Tittel
    const titleElement = itemClone.querySelector('.click-collect-item-title');
    if (titleElement instanceof HTMLAnchorElement) {
      titleElement.textContent = item.title || 'Ukjent produkt';
      titleElement.href = item.url || '#';
    }

    // Varianter
    const variantsContainer = itemClone.querySelector('.click-collect-item-variants');
    if (variantsContainer instanceof HTMLElement) {
      variantsContainer.innerHTML = '';
      if (item.variantOptionsArray?.length) {
        item.variantOptionsArray.forEach((opt) => {
          const p = document.createElement('p');
          p.className = 'text-sm text-gray-600 leading-tight';
          p.textContent = `${opt.name}: ${opt.value}`;
          variantsContainer.appendChild(p);
        });
      } else if (item.variantTitle) {
        const p = document.createElement('p');
        p.className = 'text-sm text-gray-600 leading-tight';
        p.textContent = item.variantTitle;
        variantsContainer.appendChild(p);
      }
    }

    // Antall
    const quantityElement = itemClone.querySelector('.click-collect-item-quantity');
    if (quantityElement instanceof HTMLElement) {
      quantityElement.textContent = `Antall: ${item.quantity || 0}`;
    }

    // Pris
    const priceElement = itemClone.querySelector('.click-collect-item-price');
    const originalPriceElement = itemClone.querySelector('.click-collect-item-original-price');
    const linePriceElement = itemClone.querySelector('.click-collect-item-line-price');

    if (priceElement instanceof HTMLElement) {
      priceElement.textContent = item.price ? formatCurrency(item.price) : 'N/A';
    }

    if (
      originalPriceElement instanceof HTMLElement &&
      item.original_price &&
      item.original_price > item.price
    ) {
      originalPriceElement.textContent = formatCurrency(item.original_price);
      originalPriceElement.style.display = 'inline';
    } else if (originalPriceElement instanceof HTMLElement) {
      originalPriceElement.style.display = 'none';
    }

    if (
      linePriceElement instanceof HTMLElement &&
      item.line_price &&
      (item.quantity > 1 || (item.original_price && item.original_price > item.price))
    ) {
      linePriceElement.textContent = `Totalpris: ${formatCurrency(item.line_price)}`;
      linePriceElement.style.display = 'block';
    } else if (linePriceElement instanceof HTMLElement) {
      linePriceElement.style.display = 'none';
    }

    // Fjern-knapp
    const removeButton = itemClone.querySelector('.remove-click-collect-item');
    if (removeButton instanceof HTMLElement) {
      if (removeButton instanceof HTMLButtonElement || removeButton instanceof HTMLAnchorElement) {
        removeButton.setAttribute('aria-label', `Fjern ${item.title || 'produkt'} fra hentelisten`);
      }
      if ('dataset' in removeButton) {
        removeButton.dataset.itemKey = item.key || '';
        removeButton.dataset.itemId = item.productId || '';
        removeButton.dataset.itemVariantId = item.variantId || '';
      }
    }

    // Legg til i DOM
    listContainer.appendChild(itemClone);
  });

  updateHiddenInputFields();
}

function optionClickCollect(productData) {
  if (
    !productData ||
    (typeof productData.productId === 'undefined' && typeof productData.key === 'undefined')
  ) {
    console.error('[CC] optionClickCollect: Utilstrekkelig productData.', productData);
    return;
  }

  const idToUse = String(productData.productId);
  const variantIdToUse = String(productData.variantId);
  const keyToUse = productData.key;

  const applicableProductIndex = ClickCollectOptions.findIndex(
    (item) =>
      (keyToUse && item.key === keyToUse) ||
      (String(item.productId) === idToUse && String(item.variantId) === variantIdToUse)
  );

  const qtyToAdd = parseInt(productData.quantity, 10);
  if (isNaN(qtyToAdd)) {
    console.error('[KH] optionClickCollect: Ugyldig quantity.', productData);
    return;
  }

  const newItemData = {
    productId: idToUse,
    variantId: variantIdToUse,
    key: keyToUse,
    title: productData.title || 'Ukjent produkt',
    variantTitle: productData.variantTitle,
    variantOptionsArray: productData.variantOptionsArray || [],
    quantity: qtyToAdd,
    image: productData.image,
    price: productData.price,
    original_price: productData.original_price,
    line_price: productData.line_price,
    url: productData.url,
  };

  if (applicableProductIndex > -1) {
    ClickCollectOptions[applicableProductIndex] = {
      ...ClickCollectOptions[applicableProductIndex],
      ...newItemData,
    };
  } else {
    ClickCollectOptions.push(newItemData);
  }
  localStorage.setItem('ClickCollectOptions', JSON.stringify(ClickCollectOptions));
  updateClickCollectSummary();
}

function updateDeliveryMethodUI() {
  const allCards = document.querySelectorAll('delivery-method-options delivery-method__card');

  allCards.forEach((card) => {
    const radio = card.querySelector('input[type="radio"]');
    const isChecked = radio instanceof HTMLInputElement && radio.checked;

    if (isChecked) {
      card.classList.add('active', 'border-black');
      card.classList.remove('border-transparent');
    } else {
      card.classList.remove('active', 'border-black');
      card.classList.add('border-transparent');
    }
  });
}

const deliveryOptionsContainer = document.getElementById('delivery-method-options');

if (deliveryOptionsContainer) {
  deliveryOptionsContainer.addEventListener('click', (event) => {
    const target = event.target;
    const selectedCard =
      target instanceof HTMLElement ? target.closest('.option-shipping') : null;

    if (!(selectedCard instanceof HTMLElement)) return;

    const radio = selectedCard.querySelector('input[type="radio"]');
    if (radio instanceof HTMLInputElement) {
      radio.checked = true;
      updateUI();
    }
  });

  document.addEventListener('DOMContentLoaded', updateUI);
}

const listContainer = document.getElementById('click-collect-summary');

if (listContainer) {
  listContainer.addEventListener('click', (event) => {
    const target = event.target;

    const removeButton =
      target instanceof HTMLElement ? target.closest('.remove-click-collect-item') : null;

    if (removeButton instanceof HTMLElement) {
      const {
        itemKey = '',
        itemId: productId = '',
        itemVariantId: variantId = '',
      } = removeButton.dataset || {};
      removeClickCollectChecked(itemKey, productId, variantId);
    }
  });
}

function removeClickCollectChecked(itemKey, productId, variantId) {
  const opprinneligLengde = ClickCollectOptions.length;
  ClickCollectOptions = ClickCollectOptions.filter((item) => {
    if (itemKey && item.key === itemKey) return false;
    if (
      !itemKey &&
      String(item.productId) === String(productId) &&
      String(item.variantId) === String(variantId)
    )
      return false;
    return true;
  });

  if (ClickCollectOptions.length < opprinneligLengde) {
    localStorage.setItem('ClickCollectOptions', JSON.stringify(ClickCollectOptions));
    updateClickCollectSummary();
  } else {
    console.warn('[KH] Ingen vare funnet for fjerning.');
  }
}

async function syncClickCollectWithCart() {
  try {
    const cart = await fetchAndUpdateCartCount();
    if (cart && cart.items) {
      ClickCollectOptions = cart.items.map((item) => ({
        productId: String(item.product_id),
        variantId: String(item.variant_id),
        key: item.key,
        title: item.product_title,
        variantTitle: item.variant_title,
        variantOptionsArray: getFormattedVariantOptions(item.options_with_values),
        quantity: item.quantity,
        image: item.image ? item.image.replace(/(\.[^.]*)$/, '_200x$1') : null,
        price: item.price,
        original_price: item.original_price,
        line_price: item.final_line_price,
        url: item.url,
      }));
      localStorage.setItem('ClickCollectOptions', JSON.stringify(ClickCollectOptions));
    } else {
      ClickCollectOptions = [];
      localStorage.setItem('ClickCollectOptions', JSON.stringify(ClickCollectOptions));
    }
    updateClickCollectSummary();
  } catch (err) {
    console.error('[KH] Feil under synkronisering med handlekurv:', err);
  }
}

function initializeClickCollectLogicIfNeeded() {
  const ClickCollectListContainer = document.getElementById('click-collect-summary');
  if (!ClickCollectListContainer) {
    console.error('[KH] Finner ikke ClickCollectList containeren under initialisering!');
    return;
  }
  if (ClickCollectInitialized) {
    updateClickCollectSummary();
    return;
  }

  const savedOptions = localStorage.getItem('ClickCollectOptions');
  if (savedOptions) {
    try {
      ClickCollectOptions = JSON.parse(savedOptions);
    } catch (e) {
      console.error('[KH] Kunne ikke parse ClickCollectOptions fra localStorage:', e);
      ClickCollectOptions = [];
      localStorage.removeItem('ClickCollectOptions');
    }
  }

  syncClickCollectWithCart().finally(() => {
    ClickCollectInitialized = true;
  });
}

async function handleAddToCart(event) {
  event.preventDefault();

  const actionButton = event.currentTarget;
  const form = btn.closest('form');
  if (!form) return;

  const variantIdInput = form.querySelector('input[name="id"]');
  const quantityInput = form.querySelector('input[name="quantity"]');
  const formVariantId = variantIdInput?.value;
  const formQuantity = quantityInput ? parseInt(quantityInput.value, 10) : 1;
  const selectedRadio = document.querySelector('input[name="delivery_method"]:checked');
  const selectedDelivery =
    selectedRadio instanceof HTMLInputElement ? selectedRadio.value : undefined;

  if (!formVariantId) {
    console.error('Mangler variant ID.');
    return;
  }

  if (!selectedDelivery) {
    alert('Velg leveringsmetode før du legger til i handleposen.');
    return;
  }

  try {
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: formVariantId, quantity: formQuantity }),
    });

    if (!res.ok) throw new Error('Kunne ikke legge til i handleposen.');
    const itemAdded = await res.json();
    const cart = await fetchAndUpdateCartCount();
    const cartItem =
      cart?.items?.find((i) => String(i.variant_id) === String(itemAdded.variant_id)) || itemAdded;

    const formatted = {
      productId: String(cartItem.product_id),
      variantId: String(cartItem.variant_id),
      key: cartItem.key,
      title: cartItem.product_title,
      variantTitle: cartItem.variant_title,
      variantOptionsArray: getFormattedVariantOptions(cartItem.options_with_values),
      quantity: cartItem.quantity,
      image: cartItem.image ? cartItem.image.replace(/(\.[^.]*)$/, '_200x$1') : null,
      price: cartItem.price,
      original_price: cartItem.original_price,
      line_price: cartItem.final_line_price || cartItem.line_price,
      url: cartItem.url,
    };

    optionClickCollect(formatted); // Oppdaterer Click & Collect data og popup-visning

    if (selectedDelivery === 'option-click-collect') {
      const popup = document.getElementById('click-and-collect'); // Korrigert ID
      if (popup instanceof HTMLElement) {
        popup.style.display = 'flex';
      }
      setTimeout(() => {
        if (ClickCollectInitialized) {
          updateClickCollectSummary();
        } else {
          initializeClickCollectLogicIfNeeded();
        }
      }, 0);
    } else if (selectedDelivery === 'send') {
      const cartDrawerElement = document.querySelector('CartDrawer CartDrawer-CartItems'); // Finn <cart-drawer> elementet
      if (cartDrawerElement instanceof HTMLElement) {
        const cartItemsInDrawer =
          cartDrawerElement.querySelector('CartDrawer-CartItems') ||
          cartDrawerElement.querySelector('drawer CartDrawer-Overlay');

        if (
          cartItemsInDrawer instanceof HTMLElement &&
          typeof cartItemsInDrawer.onCartUpdate === 'function'
        ) {
          await cartItemsInDrawer.onCartUpdate(); // Bruk await her for å vente på oppdateringen
        } else {
          console.warn(
            'Could not find a suitable cart update mechanism in cart drawer. Falling back to simple open.'
          );
        }

        document.dispatchEvent(new CustomEvent('cart:open'));
        v;
        const icon = document.querySelector('cart-drawer data-open-cart-drawer');
        if (icon instanceof HTMLElement && typeof icon.click === 'function') {
          // icon.click(); // Dette er ofte ikke nødvendig hvis 'cart:open' fungerer
        }
      }
    }
  } catch (error) {
    console.error('Feil under håndtering av "Add to Cart":', error);
  }
}
