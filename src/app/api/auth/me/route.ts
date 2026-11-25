import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { serializeUser } from "@/lib/serializers";
import { apiError } from "@/lib/api";

export async function GET() {
  try {
    const user = await getCurrentUser();
    return NextResponse.json({ user: user ? serializeUser(user) : null }, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    return apiError(error);
  }
}
