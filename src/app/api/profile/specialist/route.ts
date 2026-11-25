import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { apiError, assertSameOrigin, HttpError } from "@/lib/api";
import { specialistRequestSchema } from "@/lib/validation";
import { storeFile, validateUpload } from "@/lib/storage";
import { writeAudit } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const user = await requireUser();
    if (!user.emailVerifiedAt) throw new HttpError(403, "Сначала подтвердите email");
    const pending = await db.verificationRequest.findFirst({ where: { userId: user.id, status: "PENDING" } });
    if (pending) throw new HttpError(409, "Заявка уже находится на проверке");

    const form = await request.formData();
    const input = specialistRequestSchema.parse({
      specialization: form.get("specialization"),
      experience: form.get("experience"),
      description: form.get("description"),
    });
    const files = form.getAll("documents").filter((value): value is File => value instanceof File && value.size > 0);
    if (files.length < 1 || files.length > 3) throw new HttpError(400, "Прикрепите от 1 до 3 документов");

    const uploads = await Promise.all(files.map(async (file) => {
      const data = await validateUpload(file);
      return {
        storageKey: await storeFile(data, file.type),
        originalName: file.name.slice(0, 240),
        mimeType: file.type,
        size: file.size,
      };
    }));

    const verification = await db.$transaction(async (tx) => {
      await tx.specialistProfile.upsert({
        where: { userId: user.id },
        create: { userId: user.id, ...input },
        update: input,
      });
      return tx.verificationRequest.create({
        data: { userId: user.id, documents: { create: uploads } },
      });
    });
    await writeAudit(user.id, "VERIFICATION_SUBMITTED", "VerificationRequest", verification.id);
    return NextResponse.json({ message: "Заявка отправлена на проверку", id: verification.id }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
