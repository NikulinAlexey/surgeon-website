import { SwiperProps } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Базовые настройки которые переиспользуются
const BASE_CONFIG: Partial<SwiperProps> = {
  modules: [Navigation],
  loop: true,
  spaceBetween: 16,

  // Основные настройки touch
  touchEventsTarget: 'container', // свайп по всей зоне контейнера
  touchStartPreventDefault: false,
  touchMoveStopPropagation: false, // меняем на false
  simulateTouch: false, // отключаем симуляцию touch для мыши, чтобы избежать прилипания
  threshold: 10,
  shortSwipes: true,
  longSwipes: true,
  followFinger: true,

  // Отключаем grabCursor для мыши (он вызывает "прилипание")
  grabCursor: false,

  // Настройки для лучшей работы с мышью
  mousewheel: false,
  freeMode: false,

  // Предотвращаем конфликты
  resistance: true,
  resistanceRatio: 0.85,
  touchAngle: 45,
  touchRatio: 1,
};

// Конфиги для разных типов слайдеров
export const SWIPER_CONFIGS = {
  // Для карточек продуктов
  cards: {
    ...BASE_CONFIG,
    slidesPerView: 1.2,
    breakpoints: {
      480: { slidesPerView: 1.6, spaceBetween: 20 },
      768: { slidesPerView: 2.2, spaceBetween: 20 },
      992: { slidesPerView: 3, spaceBetween: 20 },
    },
  } as SwiperProps,

  // Для отзывов
  testimonials: {
    ...BASE_CONFIG,
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    breakpoints: {
      768: { slidesPerView: 1.5 },
      1024: { slidesPerView: 2 },
    },
    pagination: { clickable: true },
  } as SwiperProps,

  // Для героя
  hero: {
    ...BASE_CONFIG,
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    autoplay: { delay: 5000 },
    pagination: { clickable: true },
  } as SwiperProps,

  // Для логотипов
  logos: {
    ...BASE_CONFIG,
    slidesPerView: 2,
    breakpoints: {
      480: { slidesPerView: 3 },
      768: { slidesPerView: 4 },
      1024: { slidesPerView: 5 },
    },
  } as SwiperProps,
};

// Функция для кастомных конфигов
export const createSwiperConfig = (
  customConfig: Partial<SwiperProps>
): SwiperProps => ({
  ...BASE_CONFIG,
  ...customConfig,
});
