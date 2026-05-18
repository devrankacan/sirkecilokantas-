import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function checkAuth() {
  return await getServerSession(authOptions);
}

export async function GET() {
  const session = await checkAuth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const products = await prisma.product.findMany({
      orderBy: [{ category: { order: "asc" } }, { order: "asc" }],
      include: { category: { select: { id: true, nameTr: true, nameEn: true } } },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await checkAuth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const {
      nameTr,
      nameEn,
      descriptionTr,
      descriptionEn,
      price,
      image,
      available,
      order,
      categoryId,
    } = body;

    if (!nameTr || !nameEn || !categoryId) {
      return NextResponse.json(
        { error: "nameTr, nameEn, and categoryId are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        nameTr,
        nameEn,
        descriptionTr: descriptionTr || null,
        descriptionEn: descriptionEn || null,
        price,
        image: image || null,
        available: available ?? true,
        order: order ?? 0,
        categoryId,
      },
      include: { category: { select: { id: true, nameTr: true, nameEn: true } } },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
