import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiError, assertSameOrigin, clientAddress } from "@/lib/api";
import { emailOnlySchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { createToken, hashToken } from "@/lib/security";
import { sendVerificationEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const { email } = emailOnlySchema.parse(await request.json());
    await rateLimit("resend-verification", `${clientAddress(request)}:${email}`, 3, 60 * 60 * 1000);
    const user = await db.user.findUnique({ where: { email } });
    if (user && user.status === "ACTIVE" && !user.emailVerifiedAt) {
      const token = createToken();
      await db.$transaction([
        db.authToken.updateMany({
          where: { userId: user.id, type: "EMAIL_VERIFICATION", usedAt: null },
          data: { usedAt: new Date() },
        }),
        db.authToken.create({ data: {
          userId: user.id,
          tokenHash: hashToken(token),
          type: "EMAIL_VERIFICATION",
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        } }),
      ]);
      await sendVerificationEmail(user.email, token);
    }
    return NextResponse.json({ message: "Если email ещё не подтверждён, новое письмо отправлено" });
  } catch (error) {
    return apiError(error);
  }
}
