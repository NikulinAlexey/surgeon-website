import { NextRequest, NextResponse } from "next/server";
import { VerificationStatus } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    await requireRole("ADMIN");
    const status = request.nextUrl.searchParams.get("status");
    const where = status && Object.values(VerificationStatus).includes(status as VerificationStatus)
      ? { status: status as VerificationStatus } : {};
    const requests = await db.verificationRequest.findMany({
      where,
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true, patronymic: true } },
        documents: { select: { id: true } },
      },
      orderBy: [{ status: "asc" }, { submittedAt: "asc" }],
      take: 200,
    });
    return NextResponse.json({ requests });
  } catch (error) {
    return apiError(error);
  }
}
