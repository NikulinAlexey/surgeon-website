import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError, assertSameOrigin } from "@/lib/api";
import { organizationInfoSchema } from "@/lib/validation";
import { getOrganizationChecklist, getOrganizationInfo } from "@/lib/organization";
import { writeAudit } from "@/lib/audit";

export async function GET() {
  try {
    await requireRole("EDITOR", "ADMIN");
    const [info, doctors, services] = await Promise.all([
      getOrganizationInfo(),
      db.doctor.findMany({ orderBy: [{ sortOrder: "asc" }, { fullName: "asc" }] }),
      db.medicalService.findMany({ orderBy: [{ sortOrder: "asc" }, { title: "asc" }] }),
    ]);
    return NextResponse.json({ info, doctors, services, checklist: getOrganizationChecklist(info) });
  } catch (error) {
    return apiError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const editor = await requireRole("EDITOR", "ADMIN");
    const input = organizationInfoSchema.parse(await request.json());
    const info = await db.organizationInfo.upsert({ where: { id: 1 }, create: input, update: input });
    await writeAudit(editor.id, "ORGANIZATION_UPDATED", "OrganizationInfo", "1");
    revalidatePath("/", "layout");
    return NextResponse.json({ info, checklist: getOrganizationChecklist(info) });
  } catch (error) {
    return apiError(error);
  }
}
