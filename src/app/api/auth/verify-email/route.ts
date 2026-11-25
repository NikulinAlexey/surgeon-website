import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiError, assertSameOrigin, HttpError } from "@/lib/api";
import { tokenSchema } from "@/lib/validation";
import { hashToken } from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const { token } = tokenSchema.parse(await request.json());
    const record = await db.authToken.findUnique({
      where: { tokenHash: hashToken(token) },
      include: { user: true },
    });
    if (!record || record.type !== "EMAIL_VERIFICATION" || record.usedAt || record.expiresAt <= new Date()) {
      throw new HttpError(400, "Ссылка недействительна или устарела");
    }
    await db.$transaction([
      db.authToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
      db.user.update({ where: { id: record.userId }, data: { emailVerifiedAt: new Date() } }),
    ]);
    return NextResponse.json({ message: "Email подтверждён" });
  } catch (error) {
    return apiError(error);
  }
}
