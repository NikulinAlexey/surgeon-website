"use client";
import Articles from "@/components/articles/Articles";

import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useRef, useState } from "react";
import SvgIcon from "@/components/ui/SvgIcon";
import Button from "@/components/ui/Button";
import { SWIPER_CONFIGS } from "@/config/swiper-configs";

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

export default function SpecialistPage() {
  const swiperRef = useRef<SwiperType>(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setIsSubmitting(true);
    try {
      // Имитация отправки
      console.log("Отправка вопроса:", questionText);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setQuestionText("");
      setShowQuestionForm(false);
      alert("Вопрос отправлен!");
    } catch (error) {
      console.error("Ошибка отправки:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="layout__main">
        <div className="container">
          <div className="specialists-page">
            <h1 className="specialists-page__title">Специалисты</h1>

            <Articles />

            <section className="specialists-page__section">
              <div className="specialists-page__top">
                <h2 className="specialists-page__section-title">Библиотека</h2>
                <div className="specialists-page__controls">
                  <ul className="specialists-page__control-list">
                    <li className="specialists-page__control-item">
                      <Button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="specialists-page__control-button button button--circle button--size-medium button--theme-light-outline button--lifted"
                      >
                        <SvgIcon
                          name="shevron"
                          rotateAngle="-180"
                          size="14"
                          aria-hidden
                        />
                      </Button>
                    </li>
                    <li className="specialists-page__control-item">
                      <Button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="specialists-page__control-button button button--circle button--size-medium button--theme-light-outline button--lifted"
                      >
                        <SvgIcon name="shevron" size="14" aria-hidden />
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="specialists-page__body">
                <Swiper
                  {...SWIPER_CONFIGS.cards}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  className="slider slider--wide-before-xl"
                >
                  <ul className="grid grid--cols-3">
                    {libraryItems.map((item) => (
                      <SwiperSlide className="slider__item" key={item.id}>
                        <li className="grid__item">
                          <div className="specialists-page__library-item">
                            <div className="specialists-page__library-icon">
                              <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z"
                                  fill="#3498db"
                                />
                              </svg>
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
                            <a
                              href={item.downloadLink}
                              className="specialists-page__library-download"
                              download
                            >
                              Скачать PDF
                            </a>
                          </div>
                        </li>
                      </SwiperSlide>
                    ))}
                  </ul>
                </Swiper>
              </div>
            </section>

            <section className="specialists-page__section">
              <h2 className="specialists-page__section-title">Конференции</h2>
              <p className="specialists-page__section-description">
                Информация о предстоящих конференциях и мероприятиях.
              </p>
              <Link href="/conferences" className="specialists-page__link">
                Перейти к конференциям
              </Link>
            </section>

            <section className="specialists-page__section">
              <h2 className="specialists-page__section-title">Задать вопрос</h2>
              <p className="specialists-page__section-description">
                Задайте вопрос нашим специалистам и получите консультацию.
              </p>
              {!showQuestionForm ? (
                <button
                  onClick={() => setShowQuestionForm(true)}
                  className="specialists-page__link"
                >
                  Задать вопрос
                </button>
              ) : (
                <form
                  onSubmit={handleSubmitQuestion}
                  className="specialists-page__question-form"
                >
                  <textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Введите ваш вопрос..."
                    className="specialists-page__textarea"
                    rows={4}
                    disabled={isSubmitting}
                    required
                  />
                  <div className="specialists-page__form-actions">
                    <button
                      type="submit"
                      className="specialists-page__submit-question"
                      disabled={isSubmitting || !questionText.trim()}
                    >
                      {isSubmitting ? "Отправка..." : "Отправить вопрос"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowQuestionForm(false);
                        setQuestionText("");
                      }}
                      className="specialists-page__cancel-question"
                    >
                      Отмена
                    </button>
                  </div>
                </form>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
