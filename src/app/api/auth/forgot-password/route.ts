import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiError, assertSameOrigin, clientAddress } from "@/lib/api";
import { emailOnlySchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { createToken, hashToken } from "@/lib/security";
import { sendPasswordResetEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const { email } = emailOnlySchema.parse(await request.json());
    await rateLimit("forgot-password", `${clientAddress(request)}:${email}`, 5, 60 * 60 * 1000);
    const user = await db.user.findUnique({ where: { email } });
    if (user && user.status === "ACTIVE") {
      const token = createToken();
      await db.$transaction([
        db.authToken.updateMany({ where: { userId: user.id, type: "PASSWORD_RESET", usedAt: null }, data: { usedAt: new Date() } }),
        db.authToken.create({ data: {
          userId: user.id,
          tokenHash: hashToken(token),
          type: "PASSWORD_RESET",
          expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        } }),
      ]);
      await sendPasswordResetEmail(user.email, token);
    }
    return NextResponse.json({ message: "Если аккаунт существует, письмо с инструкцией отправлено" });
  } catch (error) {
    return apiError(error);
  }
}
