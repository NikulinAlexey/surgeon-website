import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { apiError, assertSameOrigin } from "@/lib/api";
import { parseBirthDate, profileSchema } from "@/lib/validation";
import { serializeUser } from "@/lib/serializers";
import { writeAudit } from "@/lib/audit";

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
