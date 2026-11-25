import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { apiError, assertSameOrigin, clientAddress, HttpError } from "@/lib/api";
import { loginSchema } from "@/lib/validation";
import { verifyPassword } from "@/lib/password";
import { createSession } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const input = loginSchema.parse(await request.json());
    await rateLimit("login", `${clientAddress(request)}:${input.email}`, 10, 15 * 60 * 1000);
    const user = await db.user.findUnique({ where: { email: input.email } });
    if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
      throw new HttpError(401, "Неверный email или пароль");
    }
    if (user.status === "BLOCKED") throw new HttpError(403, "Аккаунт заблокирован");

    await createSession(user.id);
    return NextResponse.json({ message: "Вход выполнен" });
  } catch (error) {
    return apiError(error);
  }
}
