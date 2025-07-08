class ProductPreviewHandler {
  #sectionElement;
  #productForm;
  #shopifyProductData;
  #allVaultVariantData;
  #uiGeneratedOptions;
  #variantIdInput;
  #thumbSwiper;
  #swiperInstance;
  #onOptionChangedDebounced;
  #activeVaultVariant;

  static swiper_slide_class = 'swiper-slide place-content-center flex rounded-3xl';
  static swiper_slide_img =
    'self-center w-[133px] h-[200px] md:w-[200px] md:h-[300px] justify-self-center rounded-3xl';

  #getSwiperConfig() {
    return {
      slidesPerView: 1,
      initialSlide: 0,
      direction: 'horizontal',
      loop: true, // Anbefales for en jevnere opplevelse
      grabCursor: false, // Rettet skrivefeil fra "grapCursor"
      mousewheel: {
        enabled: true, // Aktiverer modulen
        forceToAxis: true, // IGNORERER vertikal scroll på horisontal slider
      },
      speed: 400, // Eller false for kun mobilfinger
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: this.#thumbSwiper, // Koble til thumb-swiper
        autoScrollOffset: 3, // (valgfritt) hvor mye den skal scrolle videre
        multipleActiveThumbs: false,
        direction: 'horizontal',
        loop: true, // Anbefales for en jevnere opplevelse
        grabCursor: false, // Rettet skrivefeil fra "grapCursor"
        mousewheel: {
          enabled: true, // Aktiverer modulen
          forceToAxis: true, // IGNORERER vertikal scroll på horisontal slider
        },
        watchSlidesProgress: true,
        slideToClickedSlide: true, // Kun én aktiv
      },
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      on: {
        init: () => console.log('[Swiper] Init complete'),
      },
    };
  }

  constructor(sectionElement) {
    this.#sectionElement = sectionElement;
    if (!this.#sectionElement) return;

    if (!this.#loadInitialData() || !this.#setupFormElements()) {
      return;
    }

    this.#uiGeneratedOptions = this.#parseShopifyOptions(this.#shopifyProductData);
    this.init();
  }

  #debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  #loadInitialData() {
    try {
      const productJsonElement = this.#sectionElement.querySelector('script[data-product-json]');
      const rawProductJson = productJsonElement
        ? productJsonElement.textContent
        : this.#sectionElement.dataset.productJson;

      if (!rawProductJson?.trim()) return false;
      this.#shopifyProductData = JSON.parse(rawProductJson);

      const vaultVariantsJsonScript = this.#sectionElement.querySelector(
        'script[data-all-vault-variants-json]'
      );
      if (!vaultVariantsJsonScript || !vaultVariantsJsonScript.textContent) return false;
      this.#allVaultVariantData = JSON.parse(vaultVariantsJsonScript.textContent);

      return !(
        !this.#shopifyProductData ||
        typeof this.#shopifyProductData !== 'object' ||
        !this.#shopifyProductData.variants?.length ||
        !this.#allVaultVariantData
      );
    } catch (e) {
      this.#shopifyProductData = null;
      this.#allVaultVariantData = null;
      return false;
    }
  }

  #setupFormElements() {
    const productFormId = this.#sectionElement.dataset.productFormId;
    if (!productFormId) return false;
    this.#productForm = this.#sectionElement.querySelector(`#${productFormId}`);
    if (!this.#productForm) return false;

    this.#variantIdInput = this.#productForm.querySelector('[data-variant-id-input]');
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
  #updateImageGallery(vaultVariantData) {
    const swiperWrapper = this.#sectionElement.querySelector('[data-swiper-wrapper]');
    const thumbsWrapper = this.#sectionElement.querySelector(
      '.product-thumbs-swiper .swiper-wrapper'
    );
    const thumbSwiperEl = this.#sectionElement.querySelector('.thumb-swiper');

    // Tøm wrappers
    swiperWrapper.innerHTML = '';
    thumbsWrapper.innerHTML = '';

    // Initier eller reset thumbnail-swiper
    if (thumbSwiperEl) {
      if (thumbSwiperEl.swiper) thumbSwiperEl.swiper.destroy(true, true);
      this.#thumbSwiper = new Swiper(thumbSwiperEl, {
        slidesPerView: 'auto',
        spaceBetween: 12,
        freeMode: true,
        watchSlidesProgress: true,
        watchOverflow: true,
        allowTouchMove: true,
        simulateTouch: true,
        slideToClickedSlide: false, // viktig
      });
    }

    // Fjern gammel hoved-swiper
    if (this.#swiperInstance) {
      this.#swiperInstance.destroy(true, true);
      this.#swiperInstance = null;
    }

    const mediaList = Array.isArray(vaultVariantData?.images) ? vaultVariantData.images : [];
    const validMedia = Array.from(
      new Map(
        mediaList
          .map((gid) => {
            const numericId = gid?.split('/').pop();
            const media = this.#shopifyProductData.media.find((m) =>
              m.id.toString().endsWith(numericId)
            );
            return media ? [media.id, media] : null;
          })
          .filter(Boolean)
      ).values()
    );

    // Lag swiper-slides og thumbs
    validMedia.forEach((media, index) => {
      // Slide
      const img = document.createElement('img');
      img.src = media.src;
      img.alt = this.#escapeHtml(media.alt || this.#shopifyProductData.title);
      img.className = ProductPreviewHandler.swiper_slide_img;
      img.setAttribute('data-media-id', media.id);
      img.fetchPriority = 'high';
      img.decoding = 'async';

      const slide = document.createElement('div');
      slide.className = ProductPreviewHandler.swiper_slide_class;
      slide.appendChild(img);
      swiperWrapper.appendChild(slide);

      // Thumb
      const thumbSlide = document.createElement('div');
      thumbSlide.className =
        'swiper-slide w-[75px] h-[100px] flex-shrink-0 rounded-4xl cursor-pointer';
      thumbSlide.setAttribute('data-media-id', media.id);
      thumbSlide.setAttribute('data-swiper-slide-index', index);

      const thumbImg = document.createElement('img');
      thumbImg.src = media.src;
      thumbImg.alt = media.alt || this.#shopifyProductData.title;
      thumbImg.width = 75;
      thumbImg.height = 100;
      thumbImg.classList.add('opacity-100');

      thumbSlide.appendChild(thumbImg);
      thumbsWrapper.appendChild(thumbSlide);
    });

    // Fallback hvis ingen vaultMedia
    if (validMedia.length === 0 && this.#shopifyProductData?.images?.length > 0) {
      console.log('[VaultVariant] Ingen gyldige Vault-bilder – fallback brukes');
      this.#shopifyProductData.images.forEach((imgObj) => {
        const imgSrc = typeof imgObj === 'string' ? imgObj : imgObj.src;
        const imgAlt =
          typeof imgObj === 'string'
            ? this.#shopifyProductData.title
            : imgObj.alt || this.#shopifyProductData.title;
        if (imgSrc) {
          const img = document.createElement('img');
          img.src = imgSrc;
          img.alt = this.#escapeHtml(imgAlt);
          img.className = ProductPreviewHandler.swiper_slide_img;

          const slide = document.createElement('div');
          slide.className = ProductPreviewHandler.swiper_slide_class;
          slide.appendChild(img);
          swiperWrapper.appendChild(slide);
        }
      });
    }

    // Hvis fortsatt ingen bilder, vis fallback-tekst
    if (!swiperWrapper.children.length) {
      const noImageSlide = document.createElement('div');
      noImageSlide.className = ProductPreviewHandler.swiper_slide_class;
      const p = document.createElement('p');
      p.className = 'p-4 text-center';
      p.textContent = 'Ingen bilder tilgjengelig.';
      noImageSlide.appendChild(p);
      swiperWrapper.appendChild(noImageSlide);
    }

    // Start hoved-swiper
    this.#initializeSwiper();

    // === Marker aktiv thumbnail ===
    const updateActiveThumb = (activeMediaId) => {
      const thumbs = this.#sectionElement.querySelectorAll(
        '.product-thumbs-swiper [data-media-id]'
      );
      thumbs.forEach((el) => {
        el.classList.toggle('thumb--active', el.dataset.mediaId === String(activeMediaId));
      });

      const activeEl = this.#sectionElement.querySelector(
        `.product-thumbs-swiper [data-media-id="${activeMediaId}"]`
      );

      if (activeEl && this.#thumbSwiper) {
        const index = [...thumbsWrapper.children].indexOf(activeEl);
        if (index !== -1) {
          // Sentrer valgt thumb
          this.#thumbSwiper.slideTo(
            Math.max(index - Math.floor(this.#thumbSwiper.params.slidesPerView / 2), 0),
            300
          );
        }
      }
    };

    // Marker første bilde
    const firstImg = swiperWrapper.querySelector('.swiper-slide img');
    if (firstImg) {
      const media = this.#shopifyProductData.media.find((m) => firstImg.src.includes(m.src));
      if (media) updateActiveThumb(media.id);
    }

    // På slideChange → marker thumb
    this.#swiperInstance.on('slideChange', () => {
      const activeIndex = this.#swiperInstance.realIndex;
      const slides = swiperWrapper.querySelectorAll('.swiper-slide img');
      const img = slides[activeIndex];
      if (!img) return;
      const media = this.#shopifyProductData.media.find((m) => img.src.includes(m.src));
      if (media) updateActiveThumb(media.id);
    });

    // Klikk på thumb → bytt hovedbilde
    const thumbSlides = thumbsWrapper.querySelectorAll('[data-media-id]');
    const swiperSlides = swiperWrapper.querySelectorAll('.swiper-slide img');

    thumbSlides.forEach((thumbEl) => {
      thumbEl.addEventListener('click', () => {
        const mediaId = thumbEl.dataset.mediaId;
        for (let i = 0; i < swiperSlides.length; i++) {
          if (swiperSlides[i].dataset.mediaId === mediaId) {
            this.#swiperInstance.slideTo(i);
            break;
          }
        }
      });
    });

    document.dispatchEvent(new CustomEvent('variantimages:updated', { bubbles: true }));
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
            html += `<h5 class="related-productz-price font-body-family prose prose-lg text-pri-black"></h5></a></div>`;
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

  #initializeSwiper() {
    const productSwiper = this.#sectionElement.querySelector('.product-details-swiper');
    const thumbsSwiperEl = this.#sectionElement.querySelector('.product-thumbs-swiper');

    if (!productSwiper || !thumbsSwiperEl) return;

    // Destroy existing instances if they exist
    if (productSwiper.swiper) {
      productSwiper.swiper.destroy(true, true);
    }
    if (thumbsSwiperEl.swiper) {
      thumbsSwiperEl.swiper.destroy(true, true);
    }

    // Initialize thumbnail Swiper
    this.#thumbSwiper = new Swiper(thumbsSwiperEl, {
      slidesPerView: 'auto',
      spaceBetween: 12,
      freeMode: true,
      mousewheel: true,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
    });

    // Initialize main Swiper and link thumbs
    this.#swiperInstance = new Swiper(productSwiper, {
      ...this.#getSwiperConfig(),
      thumbs: {
        swiper: this.#thumbSwiper,
      },
    });

    window.myProductPageSwiper = this.#swiperInstance;
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

    this.#initializeOptions();
    this.#setupExpandableContent('.expandable-metafield', '.metafield-content');

    // === Initielt last inn første variantbilder hvis tilgjengelig ===
    if (this.#activeVaultVariant) {
      this.#updateImageGallery(this.#activeVaultVariant);
    }

    // === Swiper init kjøres ETTER at bilder er lagt inn i DOM ===
    this.#initializeSwiper();
    console.log('[Swiper] Init complete');
  }
}
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
