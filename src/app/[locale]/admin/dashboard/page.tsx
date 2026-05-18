import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminNav from "@/components/AdminNav";
import LogoUpload from "@/components/LogoUpload";

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  const [totalCategories, totalProducts, availableProducts, logoSetting, coverSetting] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
    prisma.product.count({ where: { available: true } }),
    prisma.setting.findUnique({ where: { key: "logo_url" } }),
    prisma.setting.findUnique({ where: { key: "cover_url" } }),
  ]);

  const stats = [
    {
      label: locale === "tr" ? "Toplam Kategori" : "Total Categories",
      value: totalCategories,
      icon: "📂",
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: locale === "tr" ? "Toplam Ürün" : "Total Products",
      value: totalProducts,
      icon: "🍽️",
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: locale === "tr" ? "Mevcut Ürünler" : "Available Products",
      value: availableProducts,
      icon: "✅",
      color: "bg-green-50 text-green-700",
    },
    {
      label: locale === "tr" ? "Mevcut Olmayan" : "Unavailable",
      value: totalProducts - availableProducts,
      icon: "❌",
      color: "bg-red-50 text-red-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav locale={locale} />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {locale === "tr" ? "Dashboard" : "Dashboard"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {locale === "tr" ? "Genel bakış" : "Overview"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
            >
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-xl mb-3 ${stat.color}`}
              >
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <LogoUpload locale={locale} currentLogoUrl={logoSetting?.value ?? null} currentCoverUrl={coverSetting?.value ?? null} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href={`/${locale}/admin/categories`}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-amber-300 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-blue-100 transition-colors">
                📂
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {locale === "tr" ? "Kategoriler" : "Categories"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {locale === "tr"
                    ? "Kategori ekle, düzenle, sil"
                    : "Add, edit, delete categories"}
                </p>
              </div>
              <span className="ml-auto text-gray-400 group-hover:text-amber-600 transition-colors text-xl">
                →
              </span>
            </div>
          </a>

          <a
            href={`/${locale}/admin/products`}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-amber-300 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-amber-100 transition-colors">
                🍽️
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {locale === "tr" ? "Ürünler" : "Products"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {locale === "tr"
                    ? "Ürün ekle, düzenle, sil"
                    : "Add, edit, delete products"}
                </p>
              </div>
              <span className="ml-auto text-gray-400 group-hover:text-amber-600 transition-colors text-xl">
                →
              </span>
            </div>
          </a>

          <a
            href={`/${locale}/admin/qr`}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-amber-300 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-purple-100 transition-colors">
                📱
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {locale === "tr" ? "QR Kod" : "QR Code"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {locale === "tr"
                    ? "Menü QR kodunu indir"
                    : "Download menu QR code"}
                </p>
              </div>
              <span className="ml-auto text-gray-400 group-hover:text-amber-600 transition-colors text-xl">
                →
              </span>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}
