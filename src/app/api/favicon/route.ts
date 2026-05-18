import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { prisma } from "@/lib/prisma";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const setting = await prisma.setting.findUnique({ where: { key: "logo_url" } });
    if (setting?.value) {
      const raw = setting.value.replace(/^\/api\/uploads\//, "").replace(/^\/uploads\//, "");
      const filename = path.basename(raw.split("?")[0]);
      const candidates = [
        path.join(process.cwd(), "uploads", filename),
        path.join(process.cwd(), "public", "uploads", filename),
      ];
      for (const p of candidates) {
        try {
          const file = await readFile(p);
          const ext = filename.split(".").pop()?.toLowerCase();
          const contentType =
            ext === "png" ? "image/png" :
            ext === "svg" ? "image/svg+xml" :
            ext === "webp" ? "image/webp" :
            "image/jpeg";
          return new NextResponse(file, { headers: { "Content-Type": contentType } });
        } catch {}
      }
    }
  } catch {}

  // fallback: boş 1x1 transparan png
  const empty = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", "base64");
  return new NextResponse(empty, { headers: { "Content-Type": "image/png" } });
}
