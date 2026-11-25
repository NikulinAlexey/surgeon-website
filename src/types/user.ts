export type ClientUserRole = "PATIENT" | "SPECIALIST" | "EDITOR" | "ADMIN";
export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ClientUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  patronymic: string | null;
  phone: string | null;
  birthDate: string;
  role: ClientUserRole;
  status: "ACTIVE" | "BLOCKED";
  emailVerifiedAt: string | Date | null;
  createdAt: string | Date;
  specialistProfile: {
    specialization: string;
    experience: number;
    description: string;
  } | null;
  verification: {
    id: string;
    status: VerificationStatus;
    rejectionReason: string | null;
    submittedAt: string | Date;
    reviewedAt: string | Date | null;
  } | null;
}
