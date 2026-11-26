import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError, assertSameOrigin } from "@/lib/api";
import { medicalServiceSchema } from "@/lib/validation";
import { writeAudit } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const editor = await requireRole("EDITOR", "ADMIN");
    const input = medicalServiceSchema.parse(await request.json());
    const service = await db.medicalService.create({ data: { ...input, organizationId: 1 } });
    await writeAudit(editor.id, "SERVICE_CREATED", "MedicalService", service.id);
    revalidatePath("/services");
    revalidatePath("/price");
    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
