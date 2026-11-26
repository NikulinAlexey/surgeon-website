import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError, assertSameOrigin } from "@/lib/api";
import { doctorSchema } from "@/lib/validation";
import { writeAudit } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const editor = await requireRole("EDITOR", "ADMIN");
    const input = doctorSchema.parse(await request.json());
    const doctor = await db.doctor.create({ data: { ...input, organizationId: 1 } });
    await writeAudit(editor.id, "DOCTOR_CREATED", "Doctor", doctor.id);
    revalidatePath("/doctors");
    return NextResponse.json({ doctor }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
