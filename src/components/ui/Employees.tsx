"use client";
import Section from "../Section";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { SWIPER_CONFIGS } from "@/config/swiper-configs";
import { useRef } from "react";
import EmployeeCard from "./EmployeeCard";

export default function Employees() {
  const swiperRefDoctors = useRef<SwiperType>(null);
  const swiperRefNurses = useRef<SwiperType>(null);
  const swiperRefPersonnel = useRef<SwiperType>(null);

  const doctors = [
    {
      title: "Иванов И.И.",
      description: "Специализвация врача или короткое описание",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdasdasdasф2dasd",
    },
    {
      title: "Иванов И.И.",
      description: "Специализвация врача или короткое описание",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdasdasdasd132",
    },
    {
      title: "Иванов И.И.",
      description: "Специализвация врача или короткое описание",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdas3dedasd32d",
    },
    {
      title: "Иванов И.И.",
      description: "Специализвация врача или короткое описание",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdasdasdasdasd",
    },
    {
      title: "Иванов И.И.",
      description: "Специализвация врача или короткое описание",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdasdasdasd1й2",
    },
    {
      title: "Иванов И.И.",
      description: "Специализвация врача или короткое описание",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdas3dedasda2d",
    },
  ];
  const nurses = [
    {
      title: "Паралонов Х.Х.",
      description: "Что-то про медсестру или медбрата",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdasdasdasф2dasd",
    },
    {
      title: "Паралонов Х.Х.",
      description: "Что-то про медсестру или медбрата",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdasdasdasd132",
    },
    {
      title: "Паралонов Х.Х.",
      description: "Что-то про медсестру или медбрата",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdas3dedasd32d",
    },
    {
      title: "Паралонов Х.Х.",
      description: "Что-то про медсестру или медбрата",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdasdasdasdasd",
    },
    {
      title: "Паралонов Х.Х.",
      description: "Что-то про медсестру или медбрата",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdasdasdasd1й2",
    },
    {
      title: "Паралонов Х.Х.",
      description: "Что-то про медсестру или медбрата",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdas3dedasda2d",
    },
  ];
  const otherPersonnel = [
    {
      title: "Иванов И.И.",
      description:
        "Тут будет текст про конкретного человека из прочего персонала",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdasdasdasф2dasd",
    },
    {
      title: "Иванов И.И.",
      description:
        "Тут будет текст про конкретного человека из прочего персонала",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdasdasdasd132",
    },
    {
      title: "Иванов И.И.",
      description:
        "Тут будет текст про конкретного человека из прочего персонала",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdas3dedasd32d",
    },
    {
      title: "Иванов И.И.",
      description:
        "Тут будет текст про конкретного человека из прочего персонала",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdasdasdasdasd",
    },
    {
      title: "Иванов И.И.",
      description:
        "Тут будет текст про конкретного человека из прочего персонала",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdasdasdasd1й2",
    },
    {
      title: "Иванов И.И.",
      description:
        "Тут будет текст про конкретного человека из прочего персонала",
      img: "/surgeon-website/images/good-doctor.jpg",
      id: "qweasdas3dedasda2d",
    },
  ];

  return (
    <>
      <Section
        id="doctors-ambulatornoe"
        title="Врачи"
        controls={{
          onPrevClick: () => swiperRefDoctors.current?.slidePrev(),
          onNextClick: () => swiperRefDoctors.current?.slideNext(),
        }}
      >
        <Swiper
          {...SWIPER_CONFIGS["cards-secondary"]}
          onSwiper={(swiper) => {
            swiperRefDoctors.current = swiper;
          }}
          className="slider slider--wide-before-xl"
        >
          <ul className="grid">
            {doctors.map(({ id, ...props }) => (
              <SwiperSlide className="slider__item" key={id}>
                <li className="grid__item">
                  <EmployeeCard {...props} />
                </li>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
      </Section>
      <Section
        id="nurses-ambulatornoe"
        title="Медсестры"
        controls={{
          onPrevClick: () => swiperRefNurses.current?.slidePrev(),
          onNextClick: () => swiperRefNurses.current?.slideNext(),
        }}
      >
        <Swiper
          {...SWIPER_CONFIGS["cards-secondary"]}
          onSwiper={(swiper) => {
            swiperRefNurses.current = swiper;
          }}
          className="slider slider--wide-before-xl"
        >
          <ul className="grid">
            {nurses.map(({ id, ...props }) => (
              <SwiperSlide className="slider__item" key={id}>
                <li className="grid__item">
                  <EmployeeCard {...props} />
                </li>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
      </Section>
      <Section
        id="other-personnel"
        title="Прочий персонал"
        controls={{
          onPrevClick: () => swiperRefPersonnel.current?.slidePrev(),
          onNextClick: () => swiperRefPersonnel.current?.slideNext(),
        }}
      >
        <Swiper
          {...SWIPER_CONFIGS["cards-secondary"]}
          onSwiper={(swiper) => {
            swiperRefPersonnel.current = swiper;
          }}
          className="slider slider--wide-before-xl"
        >
          <ul className="grid">
            {otherPersonnel.map(({ id, ...props }) => (
              <SwiperSlide className="slider__item" key={id}>
                <li className="grid__item">
                  <EmployeeCard {...props} />
                </li>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
      </Section>
    </>
  );
}
