import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError, assertSameOrigin } from "@/lib/api";
import { medicalServiceSchema } from "@/lib/validation";
import { writeAudit } from "@/lib/audit";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    assertSameOrigin(request);
    const editor = await requireRole("EDITOR", "ADMIN");
    const { id } = await params;
    const input = medicalServiceSchema.parse(await request.json());
    const service = await db.medicalService.update({ where: { id }, data: input });
    await writeAudit(editor.id, "SERVICE_UPDATED", "MedicalService", id);
    revalidatePath("/services");
    revalidatePath("/price");
    return NextResponse.json({ service });
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    assertSameOrigin(request);
    const editor = await requireRole("EDITOR", "ADMIN");
    const { id } = await params;
    await db.medicalService.delete({ where: { id } });
    await writeAudit(editor.id, "SERVICE_DELETED", "MedicalService", id);
    revalidatePath("/services");
    revalidatePath("/price");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
