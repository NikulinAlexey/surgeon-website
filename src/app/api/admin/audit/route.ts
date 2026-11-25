import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    await requireRole("ADMIN");
    const page = Math.max(1, Number(request.nextUrl.searchParams.get("page")) || 1);
    const take = 50;
    const [logs, total] = await Promise.all([
      db.auditLog.findMany({
        include: { actor: { select: { email: true, firstName: true, lastName: true } } },
        orderBy: { createdAt: "desc" }, skip: (page - 1) * take, take,
      }),
      db.auditLog.count(),
    ]);
    return NextResponse.json({ logs, total, page, pages: Math.ceil(total / take) });
  } catch (error) {
    return apiError(error);
  }
}
