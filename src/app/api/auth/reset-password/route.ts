import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiError, assertSameOrigin, HttpError } from "@/lib/api";
import { resetPasswordSchema } from "@/lib/validation";
import { hashToken } from "@/lib/security";
import { hashPassword } from "@/lib/password";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const input = resetPasswordSchema.parse(await request.json());
    const record = await db.authToken.findUnique({ where: { tokenHash: hashToken(input.token) } });
    if (!record || record.type !== "PASSWORD_RESET" || record.usedAt || record.expiresAt <= new Date()) {
      throw new HttpError(400, "Ссылка недействительна или устарела");
    }
    const passwordHash = await hashPassword(input.password);
    await db.$transaction([
      db.authToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
      db.user.update({ where: { id: record.userId }, data: { passwordHash } }),
      db.session.deleteMany({ where: { userId: record.userId } }),
    ]);
    return NextResponse.json({ message: "Пароль изменён. Войдите с новым паролем." });
  } catch (error) {
    return apiError(error);
  }
}
