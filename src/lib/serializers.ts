import { CurrentUser } from "./auth";

export function serializeUser(user: CurrentUser) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    patronymic: user.patronymic,
    phone: user.phone,
    birthDate: user.birthDate?.toISOString().slice(0, 10) ?? "",
    role: user.role,
    status: user.status,
    emailVerifiedAt: user.emailVerifiedAt,
    createdAt: user.createdAt,
    specialistProfile: user.specialistProfile,
    verification: user.verificationRequests[0]
      ? {
          id: user.verificationRequests[0].id,
          status: user.verificationRequests[0].status,
          rejectionReason: user.verificationRequests[0].rejectionReason,
          submittedAt: user.verificationRequests[0].submittedAt,
          reviewedAt: user.verificationRequests[0].reviewedAt,
        }
      : null,
  };
}
