"use client";

import { useState } from "react";
import { cn } from "@/lib/clsx";

interface ReviewFormProps {
  // onSubmit: (data: ReviewFormData) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  className?: string;
}

export interface ReviewFormData {
  patientName: string;
  rating: number;
  text: string;
  doctor?: string;
  treatment?: string;
}

export default function ReviewForm({
  onSubmit,
  isLoading = false,
  className = "",
}: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    patientName: "",
    rating: 0,
    text: "",
    doctor: "",
    treatment: "",
  });

  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.rating > 0 &&
      formData.text.trim() &&
      formData.patientName.trim()
    ) {
      // onSubmit(formData);
      onSubmit();
      setFormData({
        patientName: "",
        rating: 0,
        text: "",
        doctor: "",
        treatment: "",
      });
    }
  };

  const handleInputChange = (field: keyof ReviewFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const isFormValid =
    formData.rating > 0 &&
    formData.text.trim().length > 0 &&
    formData.patientName.trim().length > 0;

  return (
    <form className={cn("review-form", className)} onSubmit={handleSubmit}>
      <h3 className="review-form__title">Оставить отзыв</h3>

      {/* Имя пациента */}
      <div className="review-form__field">
        <label htmlFor="patientName" className="review-form__label">
          Ваше имя *
        </label>
        <input
          type="text"
          id="patientName"
          value={formData.patientName}
          onChange={(e) => handleInputChange("patientName", e.target.value)}
          className="review-form__input"
          placeholder="Как к вам обращаться?"
          required
          disabled={isLoading}
        />
      </div>

      {/* Рейтинг */}
      <div className="review-form__field">
        <label className="review-form__label">Ваша оценка *</label>
        <div className="review-form__rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={cn(
                "review-form__star",
                star <= (hoverRating || formData.rating) &&
                  "review-form__star--active"
              )}
              onClick={() => handleRatingChange(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              disabled={isLoading}
            >
              ★
            </button>
          ))}
          <span className="review-form__rating-value">
            {formData.rating > 0 ? `${formData.rating}.0` : "Выберите оценку"}
          </span>
        </div>
      </div>

      {/* Врач (опционально) */}
      <div className="review-form__field">
        <label htmlFor="doctor" className="review-form__label">
          Врач (если помните)
        </label>
        <input
          type="text"
          id="doctor"
          value={formData.doctor}
          onChange={(e) => handleInputChange("doctor", e.target.value)}
          className="review-form__input"
          placeholder="ФИО врача"
          disabled={isLoading}
        />
      </div>

      {/* Лечение (опционально) */}
      <div className="review-form__field">
        <label htmlFor="treatment" className="review-form__label">
          Вид лечения/процедуры
        </label>
        <input
          type="text"
          id="treatment"
          value={formData.treatment}
          onChange={(e) => handleInputChange("treatment", e.target.value)}
          className="review-form__input"
          placeholder="Консультация, операция, диагностика..."
          disabled={isLoading}
        />
      </div>

      {/* Текст отзыва */}
      <div className="review-form__field">
        <label htmlFor="reviewText" className="review-form__label">
          Ваш отзыв *
        </label>
        <textarea
          id="reviewText"
          value={formData.text}
          onChange={(e) => handleInputChange("text", e.target.value)}
          className="review-form__textarea"
          placeholder="Поделитесь вашими впечатлениями о лечении, отношении врача, результатах..."
          rows={6}
          required
          disabled={isLoading}
        />
        <div className="review-form__counter">{formData.text.length}/1000</div>
      </div>

      {/* Кнопка отправки */}
      <button
        type="submit"
        className={cn(
          "review-form__submit",
          !isFormValid && "review-form__submit--disabled"
        )}
        disabled={!isFormValid || isLoading}
      >
        {isLoading ? "Отправка..." : "Опубликовать отзыв"}
      </button>

      <p className="review-form__notice">
        * — обязательные поля для заполнения
      </p>
    </form>
  );
}
