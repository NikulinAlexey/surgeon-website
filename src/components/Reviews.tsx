import SvgIcon from "./ui/SvgIcon";
import Button from "./ui/Button";
import Review from "./ui/Review";
import ReviewForm from "./ui/ReviewForm";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { useRef } from "react";

export interface Review {
  id: string;
  patientName: string;
  rating: number; // 1-5
  text: string;
  date: string;
  doctor?: string;
  treatment?: string;
  isVerified?: boolean; // верифицированный отзыв
}

const mockReviews: Review[] = [
  {
    id: "1",
    patientName: "Анна Иванова",
    rating: 5,
    text: "Очень профессиональный подход. Доктор подробно всё объяснил, лечение помогло.",
    date: "2024-01-15",
    doctor: "Иванов А.В.",
    treatment: "Консультация",
    isVerified: true,
  },
  {
    id: "2",
    patientName: "Петр Сидоров",
    rating: 4,
    text: "Хороший специалист, но немного долго ждал приема.",
    date: "2024-01-10",
    doctor: "Петров С.И.",
    isVerified: false,
  },
  {
    id: "3",
    patientName: "Иван Иванов",
    rating: 5,
    text: "Хороший специалист, но немного долго ждал приема.",
    date: "2024-01-10",
    doctor: "Петров С.И.",
    isVerified: true,
  },
  {
    id: "4",
    patientName: "Анна Иванова",
    rating: 5,
    text: "Очень профессиональный подход. Доктор подробно всё объяснил, лечение помогло.",
    date: "2024-01-15",
    doctor: "Иванов А.В.",
    treatment: "Консультация",
    isVerified: true,
  },
  {
    id: "5",
    patientName: "Петр Сидоров",
    rating: 4,
    text: "Хороший специалист, но немного долго ждал приема.",
    date: "2024-01-10",
    doctor: "Петров С.И.",
    isVerified: false,
  },
  {
    id: "6",
    patientName: "Иван Иванов",
    rating: 5,
    text: "Хороший специалист, но немного долго ждал приема.",
    date: "2024-01-10",
    doctor: "Петров С.И.",
    isVerified: true,
  },
];

export default function Reviews() {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <section className="reviews section" id="reviews">
      <div className="reviews__container container">
        <div className="reviews__top section__top">
          <h2 className="reviews__title section__title">
            Отзывы
          </h2>
          <div className="reviews__options section__options">
            <ul className="reviews__controlls section__controlls">
              <li className="reviews__control-item">
                <Button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="reviews__control-button button button--circle button--size-medium button--theme-light-outline button--lift"
                >
                  <SvgIcon
                    name="shevron"
                    rotateAngle="-180"
                    size="14"
                    aria-hidden
                  />
                </Button>
              </li>
              <li className="reviews__control-item">
                <Button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="reviews__control-button button button--circle button--size-medium button--theme-light-outline button--lift"
                >
                  <SvgIcon name="shevron" size="14" aria-hidden />
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="reviews__body">
          <div className="reviews__slider">
            <Swiper
              modules={[Navigation]}
              // navigation
              loop
              spaceBetween={16}
              slidesPerView={2}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className="slider"
            >
              <ul className="grid">
                {mockReviews.map((review) => (
                  <SwiperSlide className="slider__item" key={review.id}>
                    <li className="grid__item">
                      <Review
                        review={review}
                        // onEdit={onEditReview}
                        // onDelete={onDeleteReview}
                        // isEditable={currentUserId === review.patientId} // если есть привязка к пользователю
                      />
                    </li>
                  </SwiperSlide>
                ))}
              </ul>
            </Swiper>
          </div>

          <div>
            <ReviewForm onSubmit={() => console.log("sumbit review")} />
          </div>
        </div>
      </div>
    </section>
  );
}
