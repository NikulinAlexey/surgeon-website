"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import ContentCard from "../ContentCard";
import { SWIPER_CONFIGS } from "@/config/swiper-configs";
import Section from "../Section";
import { PublicContentCard } from "@/lib/public-content";

export default function Articles({ items }: { items: PublicContentCard[] }) {
  const swiperRef = useRef<SwiperType>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(items.length <= 1);
  const updateControls = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <Section
      title="Статьи"
      id="articles"
      controls={items.length > 1 ? {
        onPrevClick: () => swiperRef.current?.slidePrev(),
        onNextClick: () => swiperRef.current?.slideNext(),
        prevDisabled: isBeginning,
        nextDisabled: isEnd,
      } : undefined}
    >
      {items.length === 0 ? (
        <p className="empty-state">Статьи скоро появятся.</p>
      ) : (
        <Swiper
          {...SWIPER_CONFIGS.cards}
          loop={false}
          onSwiper={updateControls}
          onSlideChange={updateControls}
          className="slider slider--wide-before-xl"
          role="list"
          aria-label="Статьи для специалистов"
        >
          {items.map((item) => (
            <SwiperSlide className="slider__item" key={item.id} role="listitem">
              <ContentCard
                type="articles"
                title={item.title}
                description={item.description}
                date={item.date}
                dateTime={item.dateTime}
                slug={item.slug}
                img={item.img}
                imageAlt={item.imageAlt}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Section>
  );
}
