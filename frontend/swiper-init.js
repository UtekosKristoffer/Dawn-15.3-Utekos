//@ts-nocheck
document.addEventListener('DOMContentLoaded', () => {
  const lazySwipers = document.querySelectorAll('.swiper');

  if (lazySwipers.length === 0) return;

  const swiperObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const sliderContainer = entry.target; // Dette er 'swiperEl' fra din kode

        if (sliderContainer.dataset.swiperLoaded) {
          observer.unobserve(sliderContainer);
          return;
        }
        sliderContainer.dataset.swiperLoaded = 'true';

        const jsUrl = sliderContainer.dataset.jsUrl;
        const cssUrl = sliderContainer.dataset.cssUrl;

        // Last CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';

        link.href = cssUrl;
        document.head.appendChild(link);

        // Last JS
        const script = document.createElement('script');
        script.src = jsUrl;

        script.onload = () => {
          const scrollbarEl = sliderContainer.parentElement.querySelector('.swiper-scrollbar');
          const slideCount = sliderContainer.querySelectorAll('.swiper-slide').length;
          if (slideCount === 0) return;

          new Swiper(sliderContainer, {
            // All din komplekse konfigurasjon er urørt:
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            initialSlide: 0,
            loop: true,
            loopAdditionalSlides: 1,
            spaceBetween: 3,
            speed: 1000,
            coverflowEffect: {
              depth: 3300,
              modifier: 1,
              slideShadows: true,
            },
            preloadImages: false,
            scrollbar: {
              el: scrollbarEl,
              draggable: true,
              dragSize: 40,
              speed: 1000,
            },
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            watchOverflow: true,
            touchEventsTarget: 'container',
            simulateTouch: true,
            followFinger: true,
            on: {
              init() {
                this.update();
                this.slideToLoop(0, 0, false);
              },
              imagesReady() {
                this.update();
              },
            },
          });
        };

        document.body.appendChild(script);
        observer.unobserve(sliderContainer);
      });
    },
    { rootMargin: '50px' }
  );

  lazySwipers.forEach((swiper) => {
    swiperObserver.observe(swiper);
  });
});
