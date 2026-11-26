import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { apiError, assertSameOrigin, HttpError } from "@/lib/api";
import { consentRevokeSchema } from "@/lib/validation";
import { writeAudit } from "@/lib/audit";

export async function GET() {
  try {
    const user = await requireUser();
    const consents = await db.consent.findMany({ where: { userId: user.id }, orderBy: { acceptedAt: "desc" } });
    return NextResponse.json({ consents }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    return apiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const user = await requireUser();
    const input = consentRevokeSchema.parse(await request.json());
    const result = await db.consent.updateMany({
      where: { userId: user.id, document: input.document, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    if (!result.count) throw new HttpError(404, "Активное согласие не найдено");
    await writeAudit(user.id, "CONSENT_REVOKED", "User", user.id, { document: input.document });
    const consents = await db.consent.findMany({ where: { userId: user.id }, orderBy: { acceptedAt: "desc" } });
    return NextResponse.json({ consents });
  } catch (error) {
    return apiError(error);
  }
}
