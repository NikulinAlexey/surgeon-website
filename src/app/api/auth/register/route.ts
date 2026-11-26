import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiError, assertSameOrigin, clientAddress } from "@/lib/api";
import { registerSchema, parseBirthDate } from "@/lib/validation";
import { hashPassword } from "@/lib/password";
import { createToken, hashToken } from "@/lib/security";
import { rateLimit } from "@/lib/rate-limit";
import { sendVerificationEmail } from "@/lib/mailer";
import { env } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const input = registerSchema.parse(await request.json());
    await rateLimit("register", clientAddress(request), 5, 60 * 60 * 1000);
    const passwordHash = await hashPassword(input.password);
    const token = createToken();

    const user = await db.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: {
          email: input.email,
          phone: input.phone,
          firstName: input.firstName,
          lastName: input.lastName,
          patronymic: input.patronymic || null,
          birthDate: parseBirthDate(input.birthDate),
          passwordHash,
          consents: {
            create: [
              { document: "privacy", documentVersion: env.PRIVACY_VERSION },
              ...(input.agreeCommunication ? [{ document: "communication", documentVersion: env.TERMS_VERSION }] : []),
            ],
          },
        },
      });
      await tx.authToken.create({
        data: {
          userId: created.id,
          tokenHash: hashToken(token),
          type: "EMAIL_VERIFICATION",
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });
      return created;
    });

    await sendVerificationEmail(user.email, token);
    return NextResponse.json({ message: "Аккаунт создан. Проверьте почту для подтверждения email." }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
