import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const setting = await prisma.setting.findUnique({ where: { key: "restaurant_info" } });
  return NextResponse.json(setting ? JSON.parse(setting.value) : {});
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  await prisma.setting.upsert({
    where: { key: "restaurant_info" },
    update: { value: JSON.stringify(body) },
    create: { key: "restaurant_info", value: JSON.stringify(body) },
  });

  return NextResponse.json({ ok: true });
}
