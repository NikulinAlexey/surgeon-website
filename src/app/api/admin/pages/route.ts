import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError } from "@/lib/api";

export async function GET() {
  try {
    await requireRole("EDITOR", "ADMIN");
    const pages = await db.page.findMany({ orderBy: { slug: "asc" }, include: { revisions: { take: 1, orderBy: { createdAt: "desc" }, include: { editor: { select: { email: true } } } } } });
    return NextResponse.json({ pages });
  } catch (error) {
    return apiError(error);
  }
}
