import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminNav from "@/components/AdminNav";
import ProductsClient from "@/components/ProductsClient";

export default async function ProductsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav locale={locale} />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <ProductsClient locale={locale} />
      </main>
    </div>
  );
}
