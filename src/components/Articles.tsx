"use client";

import SvgIcon from "./ui/SvgIcon";
import Button from "./ui/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import ContentCard from "./ContentCard";
import { SWIPER_CONFIGS } from "@/config/swiper-configs";
import Section from "./Section";

const newsCards = [
  {
    title: "Хороший доктор",
    description:
      "История молодого талантливого врача с синдромом саванта, обладающего уникальными способностями - невероятной памятью и фантастической чувствительностью к проблемам, вспыхивающим внутри человеческого организма. Парень становится блестящим хирургом, но несмотря на это, в личностном плане его развитие соответствует уровню десятилетнего ребёнка.",
    img: "/surgeon-website/images/good-doctor.jpg",
    id: "qweasdasdasdasф2dasd",
    link: "example.com",
    date: "18.04.1997",
    slug: "novaya-medicina-2024",
  },
  {
    title: "Хороший доктор",
    description:
      "История молодого талантливого врача с синдромом саванта, обладающего уникальными способностями - невероятной памятью и фантастической чувствительностью к проблемам, вспыхивающим внутри человеческого организма. Парень становится блестящим хирургом, но несмотря на это, в личностном плане его развитие соответствует уровню десятилетнего ребёнка.",
    img: "/surgeon-website/images/good-doctor.jpg",
    id: "qweasdasdasdasd132",
    link: "example.com",
    date: "18.04.1997",
    slug: "novaya-medicina-2024",
  },
  {
    title: "Хороший доктор",
    description:
      "История молодого талантливого врача с синдромом саванта, обладающего уникальными способностями - невероятной памятью и фантастической чувствительностью к проблемам, вспыхивающим внутри человеческого организма. Парень становится блестящим хирургом, но несмотря на это, в личностном плане его развитие соответствует уровню десятилетнего ребёнка.",
    img: "/surgeon-website/images/good-doctor.jpg",
    id: "qweasdas3dedasd32d",
    link: "example.com",
    date: "18.04.1997",
    slug: "novaya-medicina-2024",
  },
  {
    title: "Хороший доктор",
    description:
      "История молодого талантливого врача с синдромом саванта, обладающего уникальными способностями - невероятной памятью и фантастической чувствительностью к проблемам, вспыхивающим внутри человеческого организма. Парень становится блестящим хирургом, но несмотря на это, в личностном плане его развитие соответствует уровню десятилетнего ребёнка.",
    img: "/surgeon-website/images/good-doctor.jpg",
    id: "qweasdasdasdasdasd",
    link: "example.com",
    date: "18.04.1997",
    slug: "novaya-medicina-2024",
  },
  {
    title: "Хороший доктор",
    description:
      "История молодого талантливого врача с синдромом саванта, обладающего уникальными способностями - невероятной памятью и фантастической чувствительностью к проблемам, вспыхивающим внутри человеческого организма. Парень становится блестящим хирургом, но несмотря на это, в личностном плане его развитие соответствует уровню десятилетнего ребёнка.",
    img: "/surgeon-website/images/good-doctor.jpg",
    id: "qweasdasdasdasd1й2",
    link: "example.com",
    date: "18.04.1997",
    slug: "novaya-medicina-2024",
  },
  {
    title: "Хороший доктор",
    description:
      "История молодого талантливого врача с синдромом саванта, обладающего уникальными способностями - невероятной памятью и фантастической чувствительностью к проблемам, вспыхивающим внутри человеческого организма. Парень становится блестящим хирургом, но несмотря на это, в личностном плане его развитие соответствует уровню десятилетнего ребёнка.",
    img: "/surgeon-website/images/good-doctor.jpg",
    id: "qweasdas3dedasda2d",
    link: "example.com",
    date: "18.04.1997",
    slug: "novaya-medicina-2024",
  },
];

export default function Articles() {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <Section
      title="Статьи"
      id="articles"
      controls={{
        onPrevClick: () => () => swiperRef.current?.slidePrev(),
        onNextClick: () => swiperRef.current?.slideNext(),
      }}
    >
      <Swiper
        {...SWIPER_CONFIGS.cards}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="slider slider--wide-before-xl"
      >
        <ul className="grid">
          {newsCards.map(({ id, ...props }) => (
            <SwiperSlide className="slider__item" key={id}>
              <li className="grid__item">
                <ContentCard type="articles" {...props} />
              </li>
            </SwiperSlide>
          ))}
        </ul>
      </Swiper>
    </Section>
  );
}
