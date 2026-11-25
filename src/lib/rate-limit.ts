import { db } from "./db";
import { HttpError } from "./api";
import { hashToken } from "./security";

export async function rateLimit(
  action: string,
  identity: string,
  limit: number,
  windowMs: number,
) {
  const now = new Date();
  const key = hashToken(`${action}:${identity}`);
  const result = await db.$transaction(async (tx) => {
    const existing = await tx.rateLimit.findUnique({ where: { key } });
    if (!existing || existing.expiresAt <= now) {
      return tx.rateLimit.upsert({
        where: { key },
        create: { key, count: 1, windowStart: now, expiresAt: new Date(now.getTime() + windowMs) },
        update: { count: 1, windowStart: now, expiresAt: new Date(now.getTime() + windowMs) },
      });
    }
    return tx.rateLimit.update({ where: { key }, data: { count: { increment: 1 } } });
  });

  if (result.count > limit) {
    throw new HttpError(429, "Слишком много попыток. Попробуйте позже");
  }
}
