import { PaginationParams, PaginatedResponse } from "../common";
import { Review } from "../components/review";

export interface CreateReviewRequest {
  patientName: string;
  rating: number;
  text: string;
  doctor?: string;
  treatment?: string;
}

export interface UpdateReviewRequest extends Partial<CreateReviewRequest> {
  id: string;
}

export interface ReviewFilters {
  doctor?: string;
  minRating?: number;
  isVerified?: boolean;
}

export type GetReviewsRequest = PaginationParams & Partial<ReviewFilters>;

export type GetReviewsResponse = PaginatedResponse<Review>;
