import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminNav from "@/components/AdminNav";
import QRDisplay from "@/components/QRDisplay";

export default async function QRPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const menuUrl = `/tr/menu`;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav locale={locale} />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {locale === "tr" ? "QR Kod" : "QR Code"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {locale === "tr"
              ? "Masalara yerleştirmek için QR kodunu indirin"
              : "Download the QR code to place on tables"}
          </p>
        </div>
        <QRDisplay menuUrl={menuUrl} locale={locale} />
      </main>
    </div>
  );
}
