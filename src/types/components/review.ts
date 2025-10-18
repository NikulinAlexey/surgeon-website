import { BaseEntity } from "../common";

export interface Review extends BaseEntity {
  patientName: string;
  rating: number;
  text: string;
  date: string;
  doctor?: string;
  treatment?: string;
  isVerified?: boolean;
  patientId?: string;
}

export interface ReviewProps {
  review: Review;
  className?: string;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
  isEditable?: boolean;
}

export interface ReviewsListProps {
  reviews: Review[];
  onEditReview?: (review: Review) => void;
  onDeleteReview?: (reviewId: string) => void;
  currentUserId?: string;
  isLoading?: boolean;
}
