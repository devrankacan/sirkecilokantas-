import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const logoSetting = await prisma.setting.findUnique({ where: { key: "logo_url" } });
  return NextResponse.json({ logoUrl: logoSetting?.value ?? null });
}
