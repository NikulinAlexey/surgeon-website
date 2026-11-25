import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { apiError, HttpError } from "@/lib/api";
import { readStoredFile } from "@/lib/storage";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const media = await db.media.findUnique({ where: { id } });
    if (!media || !media.isPublic) throw new HttpError(404, "Файл не найден");
    const data = await readStoredFile(media.storageKey);
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": media.mimeType,
        "Content-Length": String(data.length),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return apiError(error);
  }
}
