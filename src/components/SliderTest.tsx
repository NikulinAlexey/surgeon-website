// components/SimpleSlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Импорт базовых стилей
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SliderTest() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
      className="slider"
    >
      <SwiperSlide className="slider__item">Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 1</SwiperSlide>
    </Swiper>
  );
}
