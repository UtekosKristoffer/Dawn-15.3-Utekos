document.addEventListener('DOMContentLoaded', function () {
  const swiperEl = document.querySelector('.product-details-swiper');
  if (swiperEl) {
    new Swiper(swiperEl, {
      // Kjerneinnstillinger
      effect: 'slide',
      centeredSlides: true,
      spaceBetween: 1, // Du kan justere dette for mer mellomrom
      slidesPerView: 1, // Eller 1 hvis du alltid vil vise én hel slide
      initialSlide: 0,
      speed: 400,

      // Lazy loading (dette er riktig måte å gruppere dem på)
      preloadImages: true, // Kan settes til false hvis lazy loading er hovedstrategi
      lazy: {
        loadPrevNext: true, // Laster neste og forrige bilde
        loadBeforeTransition: true,
        loadOnTransitionStart: true,
        loadOnTransitionEnd: true,
      },

      // Navigasjon
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // Observer-innstillinger (for dynamisk innhold eller endringer)
      observer: true,
      observeParents: true, // Merk: verdien for observeParents er en boolean, ikke strengen "true"
      observeSlideChildren: true // Ofte nyttig sammen med observer/observeParents

      // Vurder også 'loop: true,' hvis du vil ha uendelig scrolling
    });
  }
});
