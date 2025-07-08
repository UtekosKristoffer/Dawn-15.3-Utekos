
import Swiper from "swiper";
export class ProductPreviewAndSwiperHandler{
 const swiper = new Swiper('.swiper ProducPreviewSwiper', {
  slidesPerView: 1,
      initialSlide: 0,
      direction: 'horizontal',
      loop: true,
      grabCursor: false,
      mousewheel: {
        enabled: true,
        forceToAxis: true,
      },
      speed: 400,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      on: {
        init: () => console.log('[Swiper] Init complete'),
      },
    }
  }

    #updateImageGallery(vaultVariantData) {
    const swiperWrapper = this.#sectionElement.querySelector('[data-swiper-wrapper]');
    }
    // Tøm wrappers
    swiperWrapper.innerHTML = '';
  }
    // Initier eller reset thumbnail-swiper
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
    );}

    
  if (!swiperWrapper.children.length) {
      const noImageSlide = document.createElement('div');
      noImageSlide.className = ProductPreviewHandler.swiper_slide_class;
      const p = document.createElement('p');
      p.className = 'p-4 text-center';
      p.textContent = 'Ingen bilder tilgjengelig.';
      noImageSlide.appendChild(p);
      swiperWrapper.appendChild(noImageSlide);
    }

    this.#initializeSwiper();

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
    validMedia.forEach((media, index) => {
      const img = document.createElement('img');
      img.src = media.src;
      img.alt = this.#escapeHtml(media.alt || this.#shopifyProductData.title);
      img.className = ProductPreviewHandler.swiper_slide_img;
      img.setAttribute('data-media-id', media.id);
      img.fetchPriority = 'high';
      img.decoding = 'async';

      const slide = document.createElement('div');
      slide.className = ProductPreviewHandler.swiperSlideClass;
      slide.appendChild(img);
      swiperWrapper.appendChild(slide);
    

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

  
    const firstImg = swiperWrapper.querySelector('.swiper-slide img');
    if (firstImg) {
      const media = this.#shopifyProductData.media.find((m) => firstImg.src.includes(m.src));
      if (media) updateActiveThumb(media.id);
    }

    this.#swiperInstance.on('slideChange', () => {
      const activeIndex = this.#swiperInstance.realIndex;
      const slides = swiperWrapper.querySelectorAll('.swiper-slide img');
      const img = slides[activeIndex];
      if (!img) return;
      const media = this.#shopifyProductData.media.find((m) => img.src.includes(m.src));
      if (media) updateActiveThumb(media.id);
    });

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

      if (this.#activeVaultVariant) {
      this.#updateImageGallery(this.#activeVaultVariant);
    }

    this.#initializeSwiper();
    console.log('[Swiper] Init complete');
  }
}
