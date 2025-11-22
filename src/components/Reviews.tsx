import Review from "./ui/Review";
import ReviewForm from "./ui/ReviewForm";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import Section from "./Section";

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
    <Section
      id="reviews"
      title="Отзывы"
      controls={{
        onPrevClick: () => swiperRef.current?.slidePrev(),
        onNextClick: () => swiperRef.current?.slideNext(),
      }}
    >
      <div className="reviews__slider">
        <Swiper
          modules={[Navigation]}
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
    </Section>
  );
}
