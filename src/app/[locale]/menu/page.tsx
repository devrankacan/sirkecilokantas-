"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

interface Product {
  id: string;
  nameTr: string;
  nameEn: string;
  descriptionTr?: string;
  descriptionEn?: string;
  price: number;
  image?: string;
  available: boolean;
  order: number;
}

interface Category {
  id: string;
  nameTr: string;
  nameEn: string;
  order: number;
  products: Product[];
}

export default function MenuPage() {
  const t = useTranslations("menu");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("/api/menu");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  function toggleLocale() {
    const newLocale = locale === "tr" ? "en" : "tr";
    const newPath = pathname.replace(`/${locale}/`, `/${newLocale}/`);
    router.push(newPath);
  }

  function handleImageError(productId: string) {
    setImageErrors((prev) => new Set(prev).add(productId));
  }

  const allProducts = categories.flatMap((c) => c.products);
  const displayProducts =
    selectedCategory === "all"
      ? allProducts
      : categories.find((c) => c.id === selectedCategory)?.products ?? [];

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cream-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cream-300 font-serif text-lg">Yükleniyor…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark-950/95 backdrop-blur border-b border-dark-800">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl text-cream-100 leading-tight">
              {t("restaurantName")}
            </h1>
            <p className="text-xs text-cream-500 tracking-widest uppercase mt-0.5">
              {t("tagline")}
            </p>
          </div>
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-dark-700 hover:border-cream-600 text-sm text-cream-400 hover:text-cream-200 transition-all"
          >
            <span className="text-base">{locale === "tr" ? "🇬🇧" : "🇹🇷"}</span>
            <span className="font-medium">{locale === "tr" ? "EN" : "TR"}</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-b from-dark-900 to-dark-950 py-8 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-0.5 bg-cream-600 mx-auto mb-4" />
          <p className="text-cream-400 text-sm tracking-wider uppercase">
            {t("title")}
          </p>
          <div className="w-16 h-0.5 bg-cream-600 mx-auto mt-4" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-[73px] z-40 bg-dark-950/95 backdrop-blur border-b border-dark-800">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-cream-600 text-dark-950"
                  : "bg-dark-800 text-cream-400 hover:bg-dark-700"
              }`}
            >
              {t("allCategories")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-cream-600 text-dark-950"
                    : "bg-dark-800 text-cream-400 hover:bg-dark-700"
                }`}
              >
                {locale === "tr" ? cat.nameTr : cat.nameEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {selectedCategory !== "all" ? (
          <section>
            {displayProducts.length === 0 ? (
              <div className="text-center py-16 text-cream-600">
                <p className="font-serif text-lg">{t("noProducts")}</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {displayProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    t={t}
                    imageError={imageErrors.has(product.id)}
                    onImageError={() => handleImageError(product.id)}
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          categories.map((cat) => (
            <section key={cat.id} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="font-serif text-xl text-cream-100">
                  {locale === "tr" ? cat.nameTr : cat.nameEn}
                </h2>
                <div className="flex-1 h-px bg-dark-800" />
              </div>
              {cat.products.length === 0 ? (
                <p className="text-cream-600 text-sm pl-1">{t("noProducts")}</p>
              ) : (
                <div className="grid gap-4">
                  {cat.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      locale={locale}
                      t={t}
                      imageError={imageErrors.has(product.id)}
                      onImageError={() => handleImageError(product.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          ))
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800 mt-8 py-6 text-center">
        <p className="text-cream-700 text-xs tracking-wider">
          © {new Date().getFullYear()} {t("restaurantName")}
        </p>
      </footer>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  locale: string;
  t: ReturnType<typeof useTranslations<"menu">>;
  imageError: boolean;
  onImageError: () => void;
}

function ProductCard({ product, locale, t, imageError, onImageError }: ProductCardProps) {
  const name = locale === "tr" ? product.nameTr : product.nameEn;
  const description =
    locale === "tr" ? product.descriptionTr : product.descriptionEn;

  return (
    <div
      className={`flex gap-4 bg-dark-900 rounded-xl p-4 border transition-all ${
        product.available
          ? "border-dark-800 hover:border-dark-700"
          : "border-dark-800 opacity-60"
      }`}
    >
      {product.image && !imageError ? (
        <div className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-dark-800">
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-cover"
            sizes="96px"
            onError={onImageError}
          />
        </div>
      ) : (
        <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-dark-800 flex items-center justify-center">
          <span className="text-3xl">🍽️</span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-base text-cream-100 leading-snug">
            {name}
          </h3>
          {!product.available && (
            <span className="flex-shrink-0 text-xs bg-dark-800 text-cream-600 px-2 py-0.5 rounded-full border border-dark-700">
              {t("unavailable")}
            </span>
          )}
        </div>
        {description && (
          <p className="text-cream-500 text-xs mt-1 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
        <p className="mt-2 text-cream-400 font-medium text-sm">
          {t("currency")}
          {Number(product.price).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
