import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const [logoSetting, coverSetting, infoSetting] = await Promise.all([
    prisma.setting.findUnique({ where: { key: "logo_url" } }),
    prisma.setting.findUnique({ where: { key: "cover_urls" } }),
    prisma.setting.findUnique({ where: { key: "restaurant_info" } }),
  ]);
  return NextResponse.json({
    logoUrl: logoSetting?.value ?? null,
    coverUrls: coverSetting ? JSON.parse(coverSetting.value) : [],
    restaurantInfo: infoSetting ? JSON.parse(infoSetting.value) : {},
  });
}
