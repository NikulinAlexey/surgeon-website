// components/Review/Review.tsx
import { cn } from "@/lib/clsx";
import { ReviewProps } from "../Reviews";
import { Review } from "@/types";

export interface ReviewProps {
  review: Review;
  className?: string;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
  isEditable?: boolean;
}

export default function Review({
  review,
  className = "",
  onEdit,
  onDelete,
  isEditable = false,
}: ReviewProps) {
  const { id, patientName, rating, text, date, doctor, treatment, isVerified } =
    review;

  // Рендер звезд рейтинга
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={cn(
          "review__star",
          index < rating ? "review__star--active" : "review__star--inactive"
        )}
      >
        ★
      </span>
    ));
  };

  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDate("ru-RU", {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //   });
  // };

  return (
    <article className={cn("review", className)}>
      <div className="review__header">
        <div className="review__patient-info">
          <h4 className="review__patient-name">
            {patientName}
            {isVerified && <span className="review__verified">✓</span>}
          </h4>
          <div className="review__rating">
            {renderStars()}
            <span className="review__rating-value">({rating}.0)</span>
          </div>
        </div>

        {isEditable && (
          <div className="review__actions">
            <button
              className="review__action review__action--edit"
              onClick={() => onEdit?.(review)}
            >
              Редактировать
            </button>
            <button
              className="review__action review__action--delete"
              onClick={() => onDelete?.(id)}
            >
              Удалить
            </button>
          </div>
        )}
      </div>

      <div className="review__content">
        <p className="review__text">{text}</p>

        {(doctor || treatment) && (
          <div className="review__details">
            {doctor && (
              <span className="review__detail">
                <strong>Врач:</strong> {doctor}
              </span>
            )}
            {treatment && (
              <span className="review__detail">
                <strong>Лечение:</strong> {treatment}
              </span>
            )}
          </div>
        )}
      </div>

      <footer className="review__footer">
        <time className="review__date" dateTime={date}>
          {/* {formatDate(date)} */}
          {date}
        </time>
      </footer>
    </article>
  );
}
