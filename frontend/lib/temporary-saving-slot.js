#getSwiperConfig() {
    return {
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
    };
}
  //

//static swiperSlideClass = 'swiper-slide place-content-center flex rounded-3xl';
     //static swiperSlideImg =
    'self-center w-[133px] h-[200px] md:w-[200px] md:h-[300px] justify-self-center rounded-3xl';
