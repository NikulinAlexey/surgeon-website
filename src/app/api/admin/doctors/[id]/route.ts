import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError, assertSameOrigin } from "@/lib/api";
import { doctorSchema } from "@/lib/validation";
import { writeAudit } from "@/lib/audit";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    assertSameOrigin(request);
    const editor = await requireRole("EDITOR", "ADMIN");
    const { id } = await params;
    const input = doctorSchema.parse(await request.json());
    const doctor = await db.doctor.update({ where: { id }, data: input });
    await writeAudit(editor.id, "DOCTOR_UPDATED", "Doctor", id);
    revalidatePath("/doctors");
    return NextResponse.json({ doctor });
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    assertSameOrigin(request);
    const editor = await requireRole("EDITOR", "ADMIN");
    const { id } = await params;
    await db.doctor.delete({ where: { id } });
    await writeAudit(editor.id, "DOCTOR_DELETED", "Doctor", id);
    revalidatePath("/doctors");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
