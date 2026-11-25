import { NextRequest, NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";
import { apiError, assertSameOrigin } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    await destroySession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error);
  }
}
