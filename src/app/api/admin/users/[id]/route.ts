import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError, assertSameOrigin, HttpError } from "@/lib/api";
import { userAdminSchema } from "@/lib/validation";
import { writeAudit } from "@/lib/audit";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("ADMIN");
    const { id } = await params;
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true, email: true, firstName: true, lastName: true, patronymic: true,
        phone: true, birthDate: true, role: true, status: true, emailVerifiedAt: true,
        createdAt: true, updatedAt: true, specialistProfile: true,
        verificationRequests: { orderBy: { submittedAt: "desc" }, include: { documents: true, reviewer: { select: { email: true } } } },
        consents: { orderBy: { acceptedAt: "desc" } },
      },
    });
    if (!user) throw new HttpError(404, "Пользователь не найден");
    return NextResponse.json({ user });
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    assertSameOrigin(request);
    const admin = await requireRole("ADMIN");
    const { id } = await params;
    const input = userAdminSchema.parse(await request.json());
    if (id === admin.id) throw new HttpError(400, "Нельзя изменить собственную роль или статус через этот раздел");
    const before = await db.user.findUnique({ where: { id } });
    if (!before) throw new HttpError(404, "Пользователь не найден");

    const data = input.action === "BLOCK" ? { status: "BLOCKED" as const }
      : input.action === "UNBLOCK" ? { status: "ACTIVE" as const }
      : { role: input.role };
    if (input.action === "SET_ROLE" && !input.role) throw new HttpError(400, "Укажите роль");
    const after = await db.$transaction(async (tx) => {
      const updated = await tx.user.update({ where: { id }, data });
      if (input.action === "BLOCK") await tx.session.deleteMany({ where: { userId: id } });
      return updated;
    });
    await writeAudit(admin.id, `USER_${input.action}`, "User", id, {
      before: { role: before.role, status: before.status },
      after: { role: after.role, status: after.status },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
