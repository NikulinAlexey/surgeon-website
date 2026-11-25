import { NextRequest, NextResponse } from "next/server";
import { Prisma, UserRole, UserStatus } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    await requireRole("ADMIN");
    const params = request.nextUrl.searchParams;
    const query = params.get("query")?.trim() || "";
    const role = params.get("role");
    const status = params.get("status");
    const page = Math.max(1, Number(params.get("page")) || 1);
    const take = 25;
    const where: Prisma.UserWhereInput = {
      ...(query ? { OR: [
        { email: { contains: query, mode: "insensitive" } },
        { firstName: { contains: query, mode: "insensitive" } },
        { lastName: { contains: query, mode: "insensitive" } },
        { phone: { contains: query } },
      ] } : {}),
      ...(role && Object.values(UserRole).includes(role as UserRole) ? { role: role as UserRole } : {}),
      ...(status && Object.values(UserStatus).includes(status as UserStatus) ? { status: status as UserStatus } : {}),
    };
    const [users, total] = await Promise.all([
      db.user.findMany({
        where,
        select: {
          id: true, email: true, firstName: true, lastName: true, patronymic: true,
          phone: true, role: true, status: true, emailVerifiedAt: true, createdAt: true,
          specialistProfile: { select: { specialization: true } },
          verificationRequests: { orderBy: { submittedAt: "desc" }, take: 1, select: { id: true, status: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * take,
        take,
      }),
      db.user.count({ where }),
    ]);
    return NextResponse.json({ users, total, page, pages: Math.ceil(total / take) });
  } catch (error) {
    return apiError(error);
  }
}
