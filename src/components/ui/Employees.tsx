"use client";
import Section from "../Section";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { SWIPER_CONFIGS } from "@/config/swiper-configs";
import { useRef } from "react";
import ContentCard from "../ContentCard";

interface EmployeesProps {
  className?: string;
}
export default function Employees({ className }: EmployeesProps) {
  const swiperRef = useRef<SwiperType>(null);
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
  return (
    <Section
      title="Сотрудники"
      controls={{
        onPrevClick: () => swiperRef.current?.slidePrev(),
        onNextClick: () => swiperRef.current?.slideNext(),
      }}
    >
      <div className="grid grid--cols grid--gap-lg">
        <div>
          Свайпер с врачами:
          <Swiper
            {...SWIPER_CONFIGS["cards-sm"]}
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
        </div>
        <div>
          Свайпер с медсестрами:
          <Swiper
            {...SWIPER_CONFIGS["cards-sm"]}
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
        </div>
        <div>
          Свайпер с прочим персоналом:
          <Swiper
            {...SWIPER_CONFIGS["cards-sm"]}
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
        </div>
      </div>
    </Section>
  );
}
