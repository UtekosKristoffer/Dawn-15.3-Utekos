/* global Swiper */

(function() {
  function isNotNull<T>(value) { // Fjernet TypeScript-spesifikk type for ren JS
    return value !== null;
  }

  if (!customElements.get('vault-image-swiper')) {
    class VaultImageGallery extends HTMLElement {
      #mainSwiperInstance = undefined;
      #thumbSwiperInstance = undefined;
      #shopifyProductData = {}; 
      
      mainSwiperWrapper = undefined;
      thumbsWrapper = undefined;
      thumbSwiperEl = undefined;
      mainSwiperEl = undefined; 


      static swiper_slide_class = 'swiper-slide place-content-center flex rounded-3xl';
      static swiper_slide_img = 'self-center w-[133px] h-[200px] md:w-[200px] md:h-[300px] justify-self-center rounded-3xl';

      constructor() {
        super();
        this.mainSwiperEl = this.querySelector('#mainSwiper'); 
        this.mainSwiperWrapper = this.querySelector('#mainSwiperWrapper');
        this.thumbSwiperEl = this.querySelector('#thumbsSwiper'); 
        this.thumbsWrapper = this.querySelector('#thumbsWrapper');

        const shopifyProductDataScript = this.closest('section')?.querySelector('[data-shopify-product-data]');
        if (shopifyProductDataScript) {
            try {
                this.#shopifyProductData = JSON.parse(shopifyProductDataScript.textContent);
            } catch (e) {
                console.error('VaultImageGallery: Feil ved parsing av data-shopify-product-data:', e);
            }
        }
      }

      connectedCallback() {
        this.#initializeSwipers();
        
        const initialImageIdsString = this.mainSwiperWrapper.dataset.imageId;
        if (initialImageIdsString) {
            const initialImageIds = initialImageIdsString.split(',');
            this.updateImages(initialImageIds); 
        } else if (this.#shopifyProductData.images && this.#shopifyProductData.images.length > 0) {
            this.updateImages(this.#shopifyProductData.images.map(img => img.id)); 
        }
      }

      disconnectedCallback() {
        if (this.#mainSwiperInstance) {
          this.#mainSwiperInstance.destroy(true, true);
        }
        if (this.#thumbSwiperInstance) {
          this.#thumbSwiperInstance.destroy(true, true);
        }
      }

      #getSwiperConfig() {
        return {
          slidesPerView: 1,
          initialSlide: 0,
          direction: 'horizontal',
          freeMode: true,
          loop: false,
          grabCursor: false,
          speed: 400,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          thumbs: {
            swiper: this.#thumbSwiperInstance,
            autoScrollOffset: 3,
            freeMode: true,
            multipleActiveThumbs: false,
            direction: 'horizontal',
            loop: false,
            grabCursor: false,
            watchSlidesProgress: true,
            slideToClickedSlide: true,
          },
          observer: true,
          observeParents: true,
          observeSlideChildren: true,
          on: {
            slideChange: () => {
              const activeIndex = this.#mainSwiperInstance.realIndex;
              const slides = this.mainSwiperWrapper.querySelectorAll('.swiper-slide img');
              const img = slides[activeIndex];
              if (!img) return;
              // Bruker nå data-image-id for å finne riktig media-objekt
              const media = this.#shopifyProductData.media.find((m) => String(m.id) === img.dataset.imageId);
              if (media) this.#updateActiveThumb(media.id);
            }
          },
        };
      }

      #initializeSwipers() {
        if (this.#mainSwiperInstance) this.#mainSwiperInstance.destroy(true, true);
        if (this.#thumbSwiperInstance) this.#thumbSwiperInstance.destroy(true, true);

        this.#thumbSwiperInstance = new Swiper(this.thumbSwiperEl, {
          slidesPerView: 'auto',
          spaceBetween: 12,
          direction: 'horizontal',
          freeMode: {
            forceToAxis: true,
          },
          watchSlidesProgress: true,
          slideToClickedSlide: true,
        });

        this.#mainSwiperInstance = new Swiper(this.mainSwiperEl, {
          ...this.#getSwiperConfig(),
          thumbs: {
            swiper: this.#thumbSwiperInstance,
          },
        });

        this.thumbsWrapper.addEventListener('click', (event) => {
          const thumbEl = event.target.closest('[data-image-id]'); // <--- Endret her
          if (!thumbEl) return;
          const imageId = thumbEl.dataset.imageId; // <--- Endret her
          const swiperSlides = this.mainSwiperWrapper.querySelectorAll('.swiper-slide img');
          for (let i = 0; i < swiperSlides.length; i++) {
            if (swiperSlides[i].dataset.imageId === imageId) { // <--- Endret her
              this.#mainSwiperInstance.slideTo(i);
              break;
            }
          }
        });
        console.log('VaultImageGallery: Swipers initialisert.');
      }

      updateImages(imageIds) {
        if (!this.mainSwiperWrapper || !this.thumbsWrapper || !this.#shopifyProductData.media) {
          console.warn('VaultImageGallery: Nødvendige elementer eller Shopify produktdata mangler for bildeoppdatering.');
          return;
        }

        this.mainSwiperWrapper.innerHTML = '';
        this.thumbsWrapper.innerHTML = '';

         const mediaList = Array.isArray(imageIds?.images) ? imageIds.images : [];
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

        if (validMedia.length === 0 && this.#shopifyProductData.images?.length > 0) {
            console.log('[VaultImageGallery] Ingen gyldige bilder funnet for variant, bruker Shopify standard.');
            this.#shopifyProductData.images.forEach(imgObj => {
                this.#addSwiperSlide(imgObj); 
            });
        } else {
            validMedia.forEach((media) => {
                this.#addSwiperSlide(media);
            });
        }
        
        if (!this.mainSwiperWrapper.children.length) {
          const noImageSlide = document.createElement('div');
          noImageSlide.className = VaultImageGallery.swiper_slide_class;
          const p = document.createElement('p');
          p.className = 'p-4 text-center';
          p.textContent = 'Ingen bilder tilgjengelig.';
          noImageSlide.appendChild(p);
          this.mainSwiperWrapper.appendChild(noImageSlide);
        }

        this.#mainSwiperInstance?.update();
        this.#mainSwiperInstance?.slideTo(0, 0);
        this.#thumbSwiperInstance?.update();
        this.#thumbSwiperInstance?.slideTo(0, 0);

        const firstActiveImageId = this.mainSwiperWrapper.querySelector('.swiper-slide img')?.dataset.imageId; // <--- Endret her
        if (firstActiveImageId) {
            this.#updateActiveThumb(firstActiveImageId);
        }

        document.dispatchEvent(new CustomEvent('variantimages:updated', { bubbles: true }));
      }

      #addSwiperSlide(media) { 
        const imgSource = media.src; 
        const imgAlt = media.alt || this.#shopifyProductData.title;
        const imageId = media.id; // <--- Endret her

        const img = document.createElement('img');
        img.src = imgSource;
        img.alt = this.#escapeHtml(imgAlt);
        img.className = VaultImageGallery.swiper_slide_img;
        img.setAttribute('data-image-id', imageId); // <--- Endret her
        img.fetchPriority = 'high';
        img.decoding = 'async';

        const slide = document.createElement('div');
        slide.className = VaultImageGallery.swiper_slide_class;
        slide.appendChild(img);
        this.mainSwiperWrapper.appendChild(slide);

        const thumbSlide = document.createElement('div');
        thumbSlide.className = 'swiper-slide w-[75px] h-[100px] flex-shrink-0 rounded-4xl cursor-pointer';
        thumbSlide.dataset.imageId = String(imageId); // <--- Endret her
        thumbSlide.dataset.swiperSlideIndex = String(this.mainSwiperWrapper.children.length - 1);

        const thumbImg = document.createElement('img');
        thumbImg.src = imgSource;
        thumbImg.alt = imgAlt;
        thumbImg.width = 75;
        thumbImg.height = 100;
        thumbImg.classList.add('opacity-100');
        thumbSlide.appendChild(thumbImg);
        this.thumbsWrapper.appendChild(thumbSlide);
      }

      #updateActiveThumb(activeImageId) { // <--- Endret her
        const thumbs = this.thumbsWrapper.querySelectorAll('[data-image-id]'); // <--- Endret her
        thumbs.forEach((el) => {
          el.classList.toggle('thumb--active', el.dataset.imageId === String(activeImageId)); // <--- Endret her
        });

        const activeEl = this.thumbsWrapper.querySelector(
          `[data-image-id="${activeImageId}"]` // <--- Endret her
        );

        if (activeEl && this.#thumbSwiperInstance) {
          const index = [...this.thumbsWrapper.children].indexOf(activeEl);
          if (index !== -1) {
            this.#thumbSwiperInstance.slideTo(
              Math.max(index - Math.floor(this.#thumbSwiperInstance.params.slidesPerView / 2), 0),
              300
            );
          }
        }
      }

      #escapeHtml(str) {
        if (typeof str !== 'string') return '';
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
      }
    }
    customElements.define('vault-image-swiper', VaultImageGallery);
  }
})();