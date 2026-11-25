import { cache } from "react";
import { cookies } from "next/headers";
import { Prisma, UserRole } from "@/generated/prisma/client";
import { db } from "./db";
import { HttpError } from "./api";
import { createToken, hashToken } from "./security";

export const SESSION_COOKIE = "surgeon_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

const userQuery = {
  specialistProfile: true,
  verificationRequests: {
    orderBy: { submittedAt: "desc" as const },
    take: 1,
    include: { documents: true },
  },
} satisfies Prisma.UserInclude;

export type CurrentUser = Prisma.UserGetPayload<{ include: typeof userQuery }>;

export async function createSession(userId: string) {
  const token = createToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await db.session.create({ data: { userId, tokenHash: hashToken(token), expiresAt } });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await db.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  }
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: { include: userQuery } },
  });

  if (!session || session.expiresAt <= new Date() || session.user.status === "BLOCKED") {
    return null;
  }
  return session.user;
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new HttpError(401, "Требуется вход в аккаунт");
  return user;
}

export async function requireRole(...roles: UserRole[]) {
  const user = await requireUser();
  if (!roles.includes(user.role)) throw new HttpError(403, "Недостаточно прав");
  return user;
}

export function isContentEditor(user: CurrentUser) {
  return user.role === "EDITOR" || user.role === "ADMIN";
}
