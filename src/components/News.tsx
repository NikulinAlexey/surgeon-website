import NewsCard from "./ContentCard";
import SvgIcon from "./ui/SvgIcon";
import Button from "./ui/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import ContentCard from "./ContentCard";

const newsCards = [
  {
    title: "Хороший доктор",
    description:
      "История молодого талантливого врача с синдромом саванта, обладающего уникальными способностями - невероятной памятью и фантастической чувствительностью к проблемам, вспыхивающим внутри человеческого организма. Парень становится блестящим хирургом, но несмотря на это, в личностном плане его развитие соответствует уровню десятилетнего ребёнка.",
    img: "/images/good-doctor.jpg",
    id: "qweasdasdasdasф2dasd",
    link: "example.com",
    date: "18.04.1997",
    slug: "novaya-medicina-2024-news",
  },
  {
    title: "Хороший доктор",
    description:
      "История молодого талантливого врача с синдромом саванта, обладающего уникальными способностями - невероятной памятью и фантастической чувствительностью к проблемам, вспыхивающим внутри человеческого организма. Парень становится блестящим хирургом, но несмотря на это, в личностном плане его развитие соответствует уровню десятилетнего ребёнка.",
    img: "/images/good-doctor.jpg",
    id: "qweasdasdasdasd132",
    link: "example.com",
    date: "18.04.1997",
    slug: "novaya-medicina-2024-news",
  },
  {
    title: "Хороший доктор",
    description:
      "История молодого талантливого врача с синдромом саванта, обладающего уникальными способностями - невероятной памятью и фантастической чувствительностью к проблемам, вспыхивающим внутри человеческого организма. Парень становится блестящим хирургом, но несмотря на это, в личностном плане его развитие соответствует уровню десятилетнего ребёнка.",
    img: "/images/good-doctor.jpg",
    id: "qweasdas3dedasd32d",
    link: "example.com",
    date: "18.04.1997",
    slug: "novaya-medicina-2024-news",
  },
  {
    title: "Хороший доктор",
    description:
      "История молодого талантливого врача с синдромом саванта, обладающего уникальными способностями - невероятной памятью и фантастической чувствительностью к проблемам, вспыхивающим внутри человеческого организма. Парень становится блестящим хирургом, но несмотря на это, в личностном плане его развитие соответствует уровню десятилетнего ребёнка.",
    img: "/images/good-doctor.jpg",
    id: "qweasdasdasdasdasd",
    link: "example.com",
    date: "18.04.1997",
    slug: "novaya-medicina-2024-news",
  },
  {
    title: "Хороший доктор",
    description:
      "История молодого талантливого врача с синдромом саванта, обладающего уникальными способностями - невероятной памятью и фантастической чувствительностью к проблемам, вспыхивающим внутри человеческого организма. Парень становится блестящим хирургом, но несмотря на это, в личностном плане его развитие соответствует уровню десятилетнего ребёнка.",
    img: "/images/good-doctor.jpg",
    id: "qweasdasdasdasd1й2",
    link: "example.com",
    date: "18.04.1997",
    slug: "novaya-medicina-2024-news",
  },
  {
    title: "Хороший доктор",
    description:
      "История молодого талантливого врача с синдромом саванта, обладающего уникальными способностями - невероятной памятью и фантастической чувствительностью к проблемам, вспыхивающим внутри человеческого организма. Парень становится блестящим хирургом, но несмотря на это, в личностном плане его развитие соответствует уровню десятилетнего ребёнка.",
    img: "/images/good-doctor.jpg",
    id: "qweasdas3dedasda2d",
    link: "example.com",
    date: "18.04.1997",
    slug: "novaya-medicina-2024-news",
  },
];

export default function News() {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <section className="news section" id="news">
      <div className="news__container container">
        <div className="news__top section__top">
          <h2 className="news__title section__title">Новости</h2>
          <div className="news__options section__options">
            <ul className="news__controlls section__controlls">
              <li className="news__control-item">
                <Button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="news__control-button button button--circle button--size-medium button--theme-light-outline button--lift"
                >
                  <SvgIcon
                    name="shevron"
                    rotateAngle="-180"
                    size="14"
                    aria-hidden
                  />
                </Button>
              </li>
              <li className="news__control-item">
                <Button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="news__control-button button button--circle button--size-medium button--theme-light-outline button--lift"
                >
                  <SvgIcon name="shevron" size="14" aria-hidden />
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="news__body">
          <Swiper
            modules={[Navigation]}
            loop
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{
              480: {
                slidesPerView: 1.6,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="slider slider--wide-before-xl"
          >
            <ul className="grid">
              {newsCards.map(({ id, ...props }) => (
                <SwiperSlide className="slider__item" key={id}>
                  <li className="grid__item">
                    <ContentCard type="news" {...props} />
                  </li>
                </SwiperSlide>
              ))}
            </ul>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
