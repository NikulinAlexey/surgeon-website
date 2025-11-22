"use client";
import Articles from "@/components/Articles";

import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useRef, useState } from "react";
import SvgIcon from "@/components/ui/SvgIcon";
import Button from "@/components/ui/Button";
import { SWIPER_CONFIGS } from "@/config/swiper-configs";
import Library from "@/components/Library";

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
        <Articles />
        <Library />
        <section className="section">
          <div className="container">
            <h2 className="section__title">Конференции</h2>
            <p className="">
              Информация о предстоящих конференциях и мероприятиях.
            </p>
            <Link href="/conferences" className="">
              Перейти к конференциям
            </Link>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <h2 className="section__title">Задать вопрос</h2>
            <p className="">
              Задайте вопрос нашим специалистам и получите консультацию.
            </p>
            {!showQuestionForm ? (
              <button
                onClick={() => setShowQuestionForm(true)}
                className="button"
              >
                Задать вопрос
              </button>
            ) : (
              <form onSubmit={handleSubmitQuestion} className="">
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Введите ваш вопрос..."
                  className="specialists-page__textarea"
                  rows={4}
                  disabled={isSubmitting}
                  required
                />
                <div className="">
                  <button
                    type="submit"
                    className="button"
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
                    className="button"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
