import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { ZodError } from "zod";
import { env } from "./env";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export function apiError(error: unknown) {
  if (error instanceof HttpError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "Проверьте правильность заполнения полей", fields: error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    return NextResponse.json({ error: "Такая запись уже существует" }, { status: 409 });
  }

  console.error(
    "Request failed",
    error instanceof Error
      ? process.env.NODE_ENV === "development" ? error.stack : error.message
      : "Unknown error",
  );
  return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
}

export function assertSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return;
  const allowed = new Set([request.nextUrl.origin, env.APP_URL]);
  if (!allowed.has(origin)) {
    throw new HttpError(403, "Недопустимый источник запроса");
  }
}

export function clientAddress(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}
