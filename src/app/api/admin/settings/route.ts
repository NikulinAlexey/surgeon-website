import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError, assertSameOrigin } from "@/lib/api";
import { settingsSchema } from "@/lib/validation";
import { writeAudit } from "@/lib/audit";

export async function GET() {
  try {
    await requireRole("EDITOR", "ADMIN");
    const settings = await db.siteSettings.upsert({ where: { id: 1 }, create: {}, update: {} });
    return NextResponse.json({ settings });
  } catch (error) {
    return apiError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const editor = await requireRole("EDITOR", "ADMIN");
    const input = settingsSchema.parse(await request.json());
    const settings = await db.siteSettings.upsert({ where: { id: 1 }, create: input, update: input });
    await writeAudit(editor.id, "SETTINGS_UPDATED", "SiteSettings", "1");
    revalidatePath("/", "layout");
    return NextResponse.json({ settings });
  } catch (error) {
    return apiError(error);
  }
}
