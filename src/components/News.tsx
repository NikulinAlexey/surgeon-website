import NewsCard from "./NewsCard";
import SvgIcon from "./ui/SvgIcon";
import Button from "./ui/Button";

import { useSwiper } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Импорт базовых стилей
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const newsCards = [
  {
    title: "Сэр Александр Флеминг",
    description:
      "британский микробиолог, первооткрыватель лизоцима и пенициллина — исторически первого антибиотика.",
    img: "/images/fleming.jpg",
    id: "qweasdasdasdasdasd",
    link: "example.com",
    date: "18.04.1997",
  },
  {
    title: "Сэр Александр Флеминг",
    description:
      "британский микробиолог, первооткрыватель лизоцима и пенициллина — исторически первого антибиотика.",
    img: "/images/fleming.jpg",
    id: "qweasdasdasdasd132",
    link: "example.com",
    date: "18.04.1997",
  },
  {
    title: "Сэр Александр Флеминг",
    description:
      "британский микробиолог, первооткрыватель лизоцима и пенициллина — исторически первого антибиотика.",
    img: "/images/fleming.jpg",
    id: "qweasdas3dedasdasd",
    link: "example.com",
    date: "18.04.1997",
  },
];

export default function News() {
  const swiper = useSwiper();
  return (
    <section className="news section" id="news">
      <div className="news__container container">
        <div className="news__top section__top">
          <h2 className="news__title section__title text-gradient">Новости</h2>
          <div className="news__options section__options">
            <ul className="news__controlls section__controlls">
              <li className="news__control-item">
                <Button
                  onClick={() => swiper.slidePrev()}
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
                  onClick={() => swiper.slideNext()}
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
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={2}
            className="slider"
          >
            <ul className="grid">
              {newsCards.map(({ id, ...props }) => (
                <SwiperSlide className="slider__item" key={id}>
                  <li className="grid__item">
                    <NewsCard {...props} />
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
