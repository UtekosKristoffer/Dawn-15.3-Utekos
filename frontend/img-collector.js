document.addEventListener('DOMContentLoaded', function () {
  const swiperEl = document.querySelector('.product-details-swiper');
  const imageGalleryContainer = document.querySelector('.product-details-swiper .swiper-wrapper');
  const allExternalImages = Array.isArray(window.externalProductImages)
    ? window.externalProductImages
    : [];

  let swiperInstance = null;

  function initializeOrUpdateSwiper() {
    if (swiperInstance) {
      swiperInstance.update();
      swiperInstance.slideTo(0, 0);
    } else {
      swiperInstance = new Swiper(swiperEl, {
        centeredSlides: true,
        slidesPerView: 1,
        initialSlide: 0,
        speed: 200,
        preloadImages: false,
        lazy: {
          loadPrevNext: true,
          elementClass: 'swiper-lazy',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        observer: true,
        observeParents: true,
      });
    }
  }

  function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') return '';
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function generateImageHtml(imageData) {
    const imageId = imageData.id; // Cloudinary public_id
    const altText = imageData.alt || '';
    const cloudName = 'doqxtgho6'; // Din Cloudinary cloud_name
    const transformations = 'w_800,h_auto,c_limit,f_auto,q_auto';
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`;
    const imageUrl = `${baseUrl}${transformations}/${imageId}`;

    return `
      <div class='swiper-slide place-self-center place-content-center flex rounded-3xl size-full'>
        <img
          src="${imageUrl}"
          alt="${escapeHtml(altText)}"
          loading="lazy"
          class='size-full rounded-3xl md:w-[50%] h-[80%] md:aspect-2/3 place-self-center'
          ${imageData.width ? `width="${imageData.width}"` : ''}
          ${imageData.height ? `height="${imageData.height}"` : ''}
        >
      </div>
    `;
  }

  function updateGallery(selectedVariantId) {
    console.log('🖼️ Oppdaterer galleri for variant:', selectedVariantId);

    const imagesToDisplay = allExternalImages.filter((image) => {
      const variantMatch =
        image.variant_id === undefined ||
        image.variant_id === null ||
        image.variant_id === '' ||
        String(image.variant_id) === String(selectedVariantId);

      return variantMatch;
    });

    imageGalleryContainer.innerHTML = '';

    if (imagesToDisplay.length === 0) {
      console.warn('⚠️ Ingen bilder å vise for valgt variant. Viser placeholder.');
      imageGalleryContainer.innerHTML =
        "<div class='swiper-slide'>Ingen bilder for denne varianten.</div>";
    } else {
      imagesToDisplay.forEach((image) => {
        const imageHtml = generateImageHtml(image);
        imageGalleryContainer.insertAdjacentHTML('beforeend', imageHtml);
      });
    }

    initializeOrUpdateSwiper();
  }

  document.addEventListener('variant:change', function (event) {
    const variantId = event.detail?.variant?.id;
    console.log('🌀 variant:change', variantId);
    updateGallery(variantId);
  });

  const productForm = document.querySelector('form[action="/cart/add"]');
  if (productForm) {
    let lastSelectedVariantId = null;

    const handleFormChange = () => {
      const formData = new FormData(productForm);
      const selectedVariantId = formData.get('id');
      if (selectedVariantId && selectedVariantId !== lastSelectedVariantId) {
        lastSelectedVariantId = selectedVariantId;
        console.log('📝 Endring i variantvalg:', selectedVariantId);
        updateGallery(selectedVariantId);
      }
    };

    productForm.addEventListener('change', handleFormChange);

    // Initial variant på sidevisning
    const initialVariantId = new FormData(productForm).get('id');
    if (initialVariantId) {
      console.log('🔄 Initial visning for variant:', initialVariantId);
      updateGallery(initialVariantId);
    } else {
      console.log('🕳️ Ingen initial variant funnet – viser fallback-bilder');
      updateGallery(undefined);
    }
  } else {
    console.warn('Fant ikke produktform – viser fallback-bilder');
    updateGallery(undefined);
  }
});
