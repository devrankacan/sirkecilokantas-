import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const url = searchParams.get("url") || `${origin}/tr/menu`;

  try {
    const qrSvg = await QRCode.toString(url, { type: "svg", margin: 2 });
    return new NextResponse(qrSvg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("QR generation error:", error);
    return NextResponse.json({ error: "QR generation failed" }, { status: 500 });
  }
}
