//@ts-nocheck

import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, EffectCoverflow } from 'swiper/modules';
// Importer de modulene du faktisk trenger

export function initializeSwipers() {
  const swiperElements = document.querySelectorAll('.swiper');
  if (swiperElements.length === 0) return;

  swiperElements.forEach((element) => {
    // Her kan du ha logikk for å gi ulike slidere ulike innstillinger
    // basert på data-attributter på HTML-elementet.
    // For nå initialiserer vi alle med en standard konfigurasjon.

    new Swiper(element, {
      modules: [Navigation, Pagination, Scrollbar, EffectCoverflow], // Vær eksplisitt
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // ... andre standard Swiper-innstillinger
    });
  });
}
