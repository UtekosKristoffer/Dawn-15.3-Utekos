//@ts-nocheck
import Swiper from 'swiper';
import {
  Pagination,
  Scrollbar,
  Mousewheel,
  FreeMode,
  Keyboard,
  EffectCoverflow,
} from 'swiper/modules';

document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelector('#section-{{ section.id }}');
  if (!section) return;

  const swipers = section.querySelectorAll('.quadrubleSwiper');

  swipers.forEach((swiperEl) => {
    const scrollbarEl = swiperEl.parentElement.querySelector('.swiper-scrollbar');
    const slideCount = swiperEl.querySelectorAll('.swiper-slide').length;
    if (slideCount === 0) return;

    new Swiper(swiperEl, {
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
        rotate: 0,
        stretch: 0,
        depth: 3300,
        modifier: 1,
        slideShadows: true,
      },
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: false,
      },
      scrollbar: {
        el: scrollbarEl,
        draggable: true,
        hide: false,
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
  });
});

export function dynamicSwiper(swiperEl) {
  new Swiper(swiperEl, {
    modules: [Pagination, Mousewheel, FreeMode, Keyboard],
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
      el: '.swiper-pagination',
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
  });
}
