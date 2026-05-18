import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("cover") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.split(".").pop();
  const filename = `cover_${Date.now()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "uploads");

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  const newUrl = `/api/uploads/${filename}`;

  const existing = await prisma.setting.findUnique({ where: { key: "cover_urls" } });
  const urls: string[] = existing ? JSON.parse(existing.value) : [];
  urls.push(newUrl);

  await prisma.setting.upsert({
    where: { key: "cover_urls" },
    update: { value: JSON.stringify(urls) },
    create: { key: "cover_urls", value: JSON.stringify(urls) },
  });

  return NextResponse.json({ coverUrls: urls });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { url } = await req.json();

  const existing = await prisma.setting.findUnique({ where: { key: "cover_urls" } });
  if (!existing) return NextResponse.json({ coverUrls: [] });

  const urls: string[] = JSON.parse(existing.value).filter((u: string) => u !== url);

  await prisma.setting.upsert({
    where: { key: "cover_urls" },
    update: { value: JSON.stringify(urls) },
    create: { key: "cover_urls", value: JSON.stringify(urls) },
  });

  return NextResponse.json({ coverUrls: urls });
}
