import type { ClientUserRole, VerificationStatus } from "@/types/user";

export type ContentKind = "ARTICLE" | "NEWS";
export type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface MediaItem {
  id: string;
  originalName: string;
  mimeType: string;
  size: number;
}

export interface ContentListItem {
  id: string;
  kind: ContentKind;
  slug: string;
  title: string;
  excerpt: string;
  status: ContentStatus;
  publishedAt: string | null;
  updatedAt: string;
  coverMedia: MediaItem | null;
  author: { email: string };
}

export interface ContentRevisionItem {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  editor: { email: string };
}

export interface ContentItem extends ContentListItem {
  body: string;
  coverAlt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  revisions: ContentRevisionItem[];
}

export interface FaqItem { id: string; question: string; answer: string }
export interface PageRevisionItem {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  faq: FaqItem[];
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  editor: { email: string };
}
export interface CmsPageItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  body: string;
  faq: FaqItem[];
  seoTitle: string | null;
  seoDescription: string | null;
  updatedAt: string;
  revisions: PageRevisionItem[];
}

export interface AdminUserItem {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string | null;
  phone: string | null;
  birthDate?: string | null;
  role: ClientUserRole;
  status: "ACTIVE" | "BLOCKED";
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt?: string;
  specialistProfile: { specialization: string; experience?: number; description?: string } | null;
  verificationRequests: VerificationRequestItem[];
  consents?: Array<{ id: string; document: string; documentVersion: string; acceptedAt: string }>;
}

export interface VerificationRequestItem {
  id: string;
  status: VerificationStatus;
  rejectionReason?: string | null;
  submittedAt: string;
  reviewedAt?: string | null;
  documents: Array<{ id: string; originalName?: string; mimeType?: string; size?: number }>;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    patronymic: string | null;
    phone?: string | null;
    specialistProfile?: { specialization: string; experience?: number; description?: string } | null;
  };
  reviewer?: { email: string } | null;
}

export interface AuditItem {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata: unknown;
  createdAt: string;
  actor: { email: string; firstName: string; lastName: string } | null;
}
