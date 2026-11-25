import { Prisma } from "@/generated/prisma/client";
import { db } from "./db";

export async function writeAudit(
  actorId: string | null,
  action: string,
  entityType: string,
  entityId: string,
  metadata?: Prisma.InputJsonValue,
) {
  await db.auditLog.create({
    data: { actorId, action, entityType, entityId, metadata },
  });
}
