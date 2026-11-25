"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import ContentCard from "../ContentCard";
import { SWIPER_CONFIGS } from "@/config/swiper-configs";
import Section from "../Section";
import { PublicContentCard } from "@/lib/public-content";

export default function News({ items }: { items: PublicContentCard[] }) {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <Section
      id="news"
      title="Новости"
      controls={items.length > 1 ? {
        onPrevClick: () => swiperRef.current?.slidePrev(),
        onNextClick: () => swiperRef.current?.slideNext(),
      } : undefined}
    >
      {items.length === 0 ? (
        <p className="text text--lg text--regular">Новости скоро появятся.</p>
      ) : (
        <Swiper
          {...SWIPER_CONFIGS.cards}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          className="slider slider--wide-before-xl"
        >
          <ul className="grid">
            {items.map((item) => (
              <SwiperSlide className="slider__item" key={item.id}>
                <li className="grid__item">
                  <ContentCard
                    type="news"
                    title={item.title}
                    description={item.description}
                    date={item.date}
                    slug={item.slug}
                    img={item.img}
                    imageAlt={item.imageAlt}
                  />
                </li>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
      )}
    </Section>
  );
}
