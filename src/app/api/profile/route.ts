import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { destroySession, requireUser } from "@/lib/auth";
import { apiError, assertSameOrigin, HttpError } from "@/lib/api";
import { deleteAccountSchema, parseBirthDate, profileSchema } from "@/lib/validation";
import { serializeUser } from "@/lib/serializers";
import { writeAudit } from "@/lib/audit";
import { verifyPassword } from "@/lib/password";
import { deleteStoredFile } from "@/lib/storage";

export async function GET() {
  try {
    const user = await requireUser();
    return NextResponse.json({ user: serializeUser(user) }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const user = await requireUser();
    const input = profileSchema.parse(await request.json());
    await db.user.update({
      where: { id: user.id },
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        patronymic: input.patronymic || null,
        phone: input.phone,
        birthDate: parseBirthDate(input.birthDate),
      },
    });
    await writeAudit(user.id, "PROFILE_UPDATED", "User", user.id);
    return NextResponse.json({ message: "Профиль сохранён" });
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const user = await requireUser();
    if (user.role === "ADMIN" || user.role === "EDITOR") {
      throw new HttpError(403, "Для удаления служебного аккаунта обратитесь к администратору организации");
    }
    const input = deleteAccountSchema.parse(await request.json());
    if (!(await verifyPassword(input.password, user.passwordHash))) throw new HttpError(401, "Неверный пароль");

    const [media, requests] = await Promise.all([
      db.media.findMany({ where: { uploadedById: user.id }, select: { storageKey: true } }),
      db.verificationRequest.findMany({ where: { userId: user.id }, include: { documents: { select: { storageKey: true } } } }),
    ]);
    const storageKeys = [...media.map((item) => item.storageKey), ...requests.flatMap((item) => item.documents.map((document) => document.storageKey))];
    await Promise.all(storageKeys.map(deleteStoredFile));
    await writeAudit(user.id, "ACCOUNT_DELETED", "User", user.id);
    await db.user.delete({ where: { id: user.id } });
    await destroySession();
    return NextResponse.json({ message: "Аккаунт и связанные файлы удалены" });
  } catch (error) {
    return apiError(error);
  }
}
