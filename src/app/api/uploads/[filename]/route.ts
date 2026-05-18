import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(_req: NextRequest, { params }: { params: { filename: string } }) {
  const filename = path.basename(params.filename);
  const filePath = path.join(process.cwd(), "uploads", filename);

  try {
    const file = await readFile(filePath);
    const ext = filename.split(".").pop()?.toLowerCase();
    const contentType =
      ext === "png" ? "image/png" :
      ext === "svg" ? "image/svg+xml" :
      ext === "webp" ? "image/webp" :
      "image/jpeg";

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
