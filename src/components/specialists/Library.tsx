"use client";

import SvgIcon from "../ui/SvgIcon";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import { SWIPER_CONFIGS } from "@/config/swiper-configs";
import Section from "../Section";
import Link from "next/link";
import ButtonLink from "../ui/ButtonLink";

const libraryItems = [
  {
    id: 1,
    title: "Основы хирургии",
    author: "Доктор Хаус",
    description:
      "Комплексное руководство по основам хирургических вмешательств.",
    downloadLink: "/downloads/surgery-basics.pdf",
  },
  {
    id: 2,
    title: "Диагностика заболеваний",
    author: "Доктор Ватсон",
    description: "Методы современной диагностики и интерпретации результатов.",
    downloadLink: "/downloads/disease-diagnosis.pdf",
  },
  {
    id: 3,
    title: "Фармакология для врачей",
    author: "Профессор Грин",
    description:
      "Полное руководство по лекарственным препаратам и их применению.",
    downloadLink: "/downloads/pharmacology.pdf",
  },
  {
    id: 4,
    title: "Кардиология сегодня",
    author: "Доктор Смит",
    description:
      "Современные подходы к лечению сердечно-сосудистых заболеваний.",
    downloadLink: "/downloads/cardiology-today.pdf",
  },
  {
    id: 5,
    title: "Неврология в практике",
    author: "Профессор Джонсон",
    description:
      "Практическое руководство по диагностике и лечению неврологических расстройств.",
    downloadLink: "/downloads/neurology-practice.pdf",
  },
  {
    id: 6,
    title: "Педиатрия для начинающих",
    author: "Доктор Браун",
    description: "Основы педиатрии и ухода за детьми.",
    downloadLink: "/downloads/pediatrics-basics.pdf",
  },
];

export default function Library() {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <Section
      title="Библиотека"
      id="library"
      controls={{
        onPrevClick: () => swiperRef.current?.slidePrev(),
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
          {libraryItems.map((item) => (
            <SwiperSlide className="slider__item" key={item.id}>
              <li className="grid__item">
                <div className="specialists-page__library-item">
                  <div className="specialists-page__library-icon">
                    <SvgIcon name="shevron" size="14" aria-hidden />
                  </div>
                  <div className="specialists-page__library-content">
                    <h3 className="specialists-page__library-title">
                      {item.title}
                    </h3>
                    <p className="specialists-page__library-author">
                      Автор: {item.author}
                    </p>
                    <p className="specialists-page__library-desc">
                      {item.description}
                    </p>
                  </div>
                  <ButtonLink
                    variant='secondary'
                    href={item.downloadLink}
                    download
                  >
                    Скачать PDF
                  </ButtonLink>
                </div>
              </li>
            </SwiperSlide>
          ))}
        </ul>
      </Swiper>
    </Section>
  );
}