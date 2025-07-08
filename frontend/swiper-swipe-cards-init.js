//@ts-nocheck
document.addEventListener('DOMContentLoaded', () => {
  // Velg KUN de som skal lazy-loade
  const lazySwipers = document.querySelectorAll('.dynamicSwiper');

  if (lazySwipers.length === 0) return;

  const swiperObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const sliderContainer = entry.target;

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
          const paginationEl = sliderContainer.parentElement.querySelector('.swiper-pagination');
          const slideCount = sliderContainer.querySelectorAll('.swiper-slide').length;
          if (slideCount === 0) return;

          new Swiper(sliderContainer, {
            slidesPerView: 1,
            spaceBetween: 20,
            direction: 'horizontal',
            loop: true,
            grabCursor: false,
            mousewheel: {
              enabled: true,
              forceToAxis: true,
            },
            freeMode: true,
            keyboard: {
              enabled: true,
            },
            pagination: {
              el: paginationEl,
              clickable: true,
            },
            breakpoints: {
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            },
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

          observer.unobserve(sliderContainer);
        };

        document.body.appendChild(script);
      });
    },
    { rootMargin: '50px' }
  );

  lazySwipers.forEach((swiperEl) => swiperObserver.observe(swiperEl));
});
