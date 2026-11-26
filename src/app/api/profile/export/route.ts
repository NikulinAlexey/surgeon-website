import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { apiError } from "@/lib/api";

export async function GET() {
  try {
    const user = await requireUser();
    const data = await db.user.findUnique({
      where: { id: user.id },
      select: {
        email: true, firstName: true, lastName: true, patronymic: true, phone: true,
        birthDate: true, role: true, emailVerifiedAt: true, createdAt: true, updatedAt: true,
        specialistProfile: { select: { specialization: true, experience: true, description: true, createdAt: true, updatedAt: true } },
        consents: { select: { document: true, documentVersion: true, acceptedAt: true, revokedAt: true }, orderBy: { acceptedAt: "asc" } },
        verificationRequests: { select: { status: true, submittedAt: true, reviewedAt: true, rejectionReason: true, documents: { select: { originalName: true, mimeType: true, size: true, createdAt: true } } }, orderBy: { submittedAt: "asc" } },
      },
    });
    return NextResponse.json({ exportedAt: new Date().toISOString(), user: data }, {
      headers: {
        "Content-Disposition": "attachment; filename=\"surgeon-profile-export.json\"",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    return apiError(error);
  }
}
