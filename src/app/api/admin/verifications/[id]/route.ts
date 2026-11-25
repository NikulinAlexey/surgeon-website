import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError, assertSameOrigin, HttpError } from "@/lib/api";
import { verificationDecisionSchema } from "@/lib/validation";
import { writeAudit } from "@/lib/audit";
import { sendMail } from "@/lib/mailer";

const include = {
  user: { select: { id: true, email: true, firstName: true, lastName: true, patronymic: true, phone: true, specialistProfile: true } },
  documents: true,
  reviewer: { select: { email: true } },
} as const;

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("ADMIN");
    const { id } = await params;
    const verification = await db.verificationRequest.findUnique({ where: { id }, include });
    if (!verification) throw new HttpError(404, "Заявка не найдена");
    return NextResponse.json({ verification });
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    assertSameOrigin(request);
    const admin = await requireRole("ADMIN");
    const { id } = await params;
    const input = verificationDecisionSchema.parse(await request.json());
    if (input.decision === "REJECTED" && input.rejectionReason.length < 5) {
      throw new HttpError(400, "Укажите причину отклонения");
    }
    const verification = await db.$transaction(async (tx) => {
      const current = await tx.verificationRequest.findUnique({ where: { id }, include: { user: true } });
      if (!current) throw new HttpError(404, "Заявка не найдена");
      if (current.status !== "PENDING") throw new HttpError(409, "Заявка уже проверена");
      const updated = await tx.verificationRequest.update({
        where: { id },
        data: {
          status: input.decision,
          rejectionReason: input.decision === "REJECTED" ? input.rejectionReason : null,
          reviewerId: admin.id,
          reviewedAt: new Date(),
        },
      });
      if (input.decision === "APPROVED") {
        await tx.user.update({ where: { id: current.userId }, data: { role: "SPECIALIST" } });
      }
      return { ...updated, email: current.user.email };
    });
    await writeAudit(admin.id, `VERIFICATION_${input.decision}`, "VerificationRequest", id, {
      rejectionReason: input.rejectionReason || undefined,
    });
    await sendMail({
      to: verification.email,
      subject: input.decision === "APPROVED" ? "Профиль специалиста подтверждён" : "Заявка специалиста отклонена",
      text: input.decision === "APPROVED"
        ? "Ваш профиль специалиста подтверждён. Войдите в личный кабинет."
        : `Причина: ${input.rejectionReason}. Вы можете исправить данные и подать заявку повторно.`,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
