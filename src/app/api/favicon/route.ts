import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { prisma } from "@/lib/prisma";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const setting = await prisma.setting.findUnique({ where: { key: "logo_url" } });
    if (setting?.value) {
      const filename = setting.value.replace("/api/uploads/", "");
      const filePath = path.join(process.cwd(), "uploads", filename);
      const file = await readFile(filePath);
      const ext = filename.split(".").pop()?.toLowerCase();
      const contentType =
        ext === "png" ? "image/png" :
        ext === "svg" ? "image/svg+xml" :
        ext === "webp" ? "image/webp" :
        "image/jpeg";
      return new NextResponse(file, { headers: { "Content-Type": contentType } });
    }
  } catch {}

  // fallback: boş 1x1 transparan png
  const empty = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", "base64");
  return new NextResponse(empty, { headers: { "Content-Type": "image/png" } });
}
